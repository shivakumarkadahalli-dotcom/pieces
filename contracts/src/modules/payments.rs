use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, Map, Symbol, symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub enum PaymentsKey {
    Admin,
    Treasury,
    FeeBps,
    Volume(Address),
}

#[contract]
pub struct Payments;

#[contractimpl]
impl Payments {
    pub fn initialize(env: Env, admin: Address, treasury: Address, fee_bps: u32) {
        admin.require_auth();
        env.storage().instance().set(&PaymentsKey::Admin, &admin);
        env.storage().instance().set(&PaymentsKey::Treasury, &treasury);
        env.storage().instance().set(&PaymentsKey::FeeBps, &fee_bps);
    }

    pub fn admin(env: Env) -> Address {
        env.storage().instance().get(&PaymentsKey::Admin).unwrap()
    }

    pub fn treasury(env: Env) -> Address {
        env.storage().instance().get(&PaymentsKey::Treasury).unwrap()
    }

    pub fn fee_bps(env: Env) -> u32 {
        env.storage().instance().get(&PaymentsKey::FeeBps).unwrap_or(0)
    }

    /// Record a payment. In an MVP we track per-payer cumulative volume.
    /// Token movement is performed at the application layer by calling
    /// the SAC/asset contract directly; this module is the policy + ledger.
    pub fn record(env: Env, from: Address, amount: i128) -> i128 {
        from.require_auth();
        let key = PaymentsKey::Volume(from.clone());
        let prev: i128 = env.storage().persistent().get(&key).unwrap_or(0);
        let next = prev + amount;
        env.storage().persistent().set(&key, &next);
        env.events().publish(
            (symbol_short!("payment"),),
            (from, amount),
        );
        next
    }

    pub fn volume_of(env: Env, who: Address) -> i128 {
        env.storage()
            .persistent()
            .get(&PaymentsKey::Volume(who))
            .unwrap_or(0)
    }

    pub fn set_fee_bps(env: Env, fee_bps: u32) {
        let admin: Address = env.storage().instance().get(&PaymentsKey::Admin).unwrap();
        admin.require_auth();
        env.storage().instance().set(&PaymentsKey::FeeBps, &fee_bps);
    }

    pub fn quote_fee(env: Env, amount: i128) -> i128 {
        let bps: u32 = Self::fee_bps(env);
        (amount * bps as i128) / 10_000
    }
}
