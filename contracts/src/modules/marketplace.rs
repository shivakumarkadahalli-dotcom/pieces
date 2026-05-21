use soroban_sdk::{contract, contractimpl, contracttype, Address, BytesN, Env, String, symbol_short};

#[contracttype]
#[derive(Clone)]
pub enum ListingStatus {
    Open,
    Filled,
    Cancelled,
}

#[contracttype]
#[derive(Clone)]
pub struct Listing {
    pub seller: Address,
    pub title: String,
    pub price: i128,
    pub status: ListingStatus,
}

#[contracttype]
#[derive(Clone)]
pub enum MarketKey {
    Listing(u64),
    NextId,
}

#[contract]
pub struct Marketplace;

#[contractimpl]
impl Marketplace {
    pub fn list(env: Env, seller: Address, title: String, price: i128) -> u64 {
        seller.require_auth();
        let id: u64 = env.storage().instance().get(&MarketKey::NextId).unwrap_or(1);
        let l = Listing { seller: seller.clone(), title, price, status: ListingStatus::Open };
        env.storage().persistent().set(&MarketKey::Listing(id), &l);
        env.storage().instance().set(&MarketKey::NextId, &(id + 1));
        env.events().publish((symbol_short!("market"), symbol_short!("list")), (id, seller, price));
        id
    }

    pub fn fill(env: Env, id: u64, buyer: Address) {
        buyer.require_auth();
        let mut l: Listing = env.storage().persistent().get(&MarketKey::Listing(id)).unwrap();
        l.status = ListingStatus::Filled;
        env.storage().persistent().set(&MarketKey::Listing(id), &l);
        env.events().publish((symbol_short!("market"), symbol_short!("fill")), (id, buyer));
    }

    pub fn cancel(env: Env, id: u64) {
        let mut l: Listing = env.storage().persistent().get(&MarketKey::Listing(id)).unwrap();
        l.seller.require_auth();
        l.status = ListingStatus::Cancelled;
        env.storage().persistent().set(&MarketKey::Listing(id), &l);
        env.events().publish((symbol_short!("market"), symbol_short!("cancel")), id);
    }

    pub fn get(env: Env, id: u64) -> Listing {
        env.storage().persistent().get(&MarketKey::Listing(id)).unwrap()
    }
}
