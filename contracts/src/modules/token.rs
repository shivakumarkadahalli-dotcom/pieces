use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, symbol_short};

#[contracttype]
#[derive(Clone)]
pub enum TokenKey {
    Admin,
    Name,
    Symbol,
    Decimals,
    TotalSupply,
    Balance(Address),
    Allowance(Address, Address),
}

#[contract]
pub struct Token;

#[contractimpl]
impl Token {
    pub fn initialize(env: Env, admin: Address, name: String, symbol: String, decimals: u32) {
        admin.require_auth();
        env.storage().instance().set(&TokenKey::Admin, &admin);
        env.storage().instance().set(&TokenKey::Name, &name);
        env.storage().instance().set(&TokenKey::Symbol, &symbol);
        env.storage().instance().set(&TokenKey::Decimals, &decimals);
        env.storage().instance().set(&TokenKey::TotalSupply, &0i128);
    }

    pub fn name(env: Env) -> String { env.storage().instance().get(&TokenKey::Name).unwrap() }
    pub fn symbol(env: Env) -> String { env.storage().instance().get(&TokenKey::Symbol).unwrap() }
    pub fn decimals(env: Env) -> u32 { env.storage().instance().get(&TokenKey::Decimals).unwrap_or(7) }
    pub fn total_supply(env: Env) -> i128 { env.storage().instance().get(&TokenKey::TotalSupply).unwrap_or(0) }

    pub fn balance_of(env: Env, who: Address) -> i128 {
        env.storage().persistent().get(&TokenKey::Balance(who)).unwrap_or(0)
    }

    pub fn mint(env: Env, to: Address, amount: i128) {
        let admin: Address = env.storage().instance().get(&TokenKey::Admin).unwrap();
        admin.require_auth();
        let bal = Self::balance_of(env.clone(), to.clone());
        env.storage().persistent().set(&TokenKey::Balance(to.clone()), &(bal + amount));
        let ts: i128 = Self::total_supply(env.clone());
        env.storage().instance().set(&TokenKey::TotalSupply, &(ts + amount));
        env.events().publish((symbol_short!("token"), symbol_short!("mint")), (to, amount));
    }

    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();
        let fb = Self::balance_of(env.clone(), from.clone());
        assert!(fb >= amount, "insufficient");
        env.storage().persistent().set(&TokenKey::Balance(from.clone()), &(fb - amount));
        let tb = Self::balance_of(env.clone(), to.clone());
        env.storage().persistent().set(&TokenKey::Balance(to.clone()), &(tb + amount));
        env.events().publish((symbol_short!("token"), symbol_short!("transfer")), (from, to, amount));
    }
}
