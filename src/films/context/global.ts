interface IGlobalContext {
  // Add your global context here
  searching: boolean;
}

class GlobalContext implements IGlobalContext {
  static #instance: GlobalContext;
  searching: boolean = false;

  constructor() {}

  public static get instance(): GlobalContext {
    if (!GlobalContext.#instance) {
      GlobalContext.#instance = new GlobalContext();
    }

    return GlobalContext.#instance;
  }
}

export default GlobalContext;
