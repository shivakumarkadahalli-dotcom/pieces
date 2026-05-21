use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Vec, symbol_short};

#[contracttype]
#[derive(Clone)]
pub struct Recipient {
    pub address: Address,
    pub bps: u32,
}

#[contracttype]
#[derive(Clone)]
pub enum RoyaltyKey {
    Splits(u64),
    Owner,
}

#[contract]
pub struct Royalty;

#[contractimpl]
impl Royalty {
    pub fn set_owner(env: Env, owner: Address) {
        owner.require_auth();
        env.storage().instance().set(&RoyaltyKey::Owner, &owner);
    }

    pub fn set_splits(env: Env, asset_id: u64, splits: Vec<Recipient>) {
        let owner: Address = env.storage().instance().get(&RoyaltyKey::Owner).unwrap();
        owner.require_auth();
        let total: u32 = splits.iter().map(|r| r.bps).sum();
        assert!(total <= 10_000, "splits exceed 100%");
        env.storage().persistent().set(&RoyaltyKey::Splits(asset_id), &splits);
        env.events().publish((symbol_short!("royalty"), symbol_short!("set")), asset_id);
    }

    pub fn get_splits(env: Env, asset_id: u64) -> Vec<Recipient> {
        env.storage().persistent().get(&RoyaltyKey::Splits(asset_id)).unwrap_or(Vec::new(&env))
    }

    pub fn distribute(env: Env, asset_id: u64, gross: i128) -> i128 {
        let splits = Self::get_splits(env.clone(), asset_id);
        let mut paid: i128 = 0;
        for r in splits.iter() {
            let share = (gross * r.bps as i128) / 10_000;
            paid += share;
            env.events().publish(
                (symbol_short!("royalty"), symbol_short!("pay")),
                (r.address, share),
            );
        }
        paid
    }
}
