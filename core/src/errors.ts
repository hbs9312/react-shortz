const DUPLICATE_KEY_ERROR = "Duplicate key Error"
export class DuplicateKeyError extends Error {
  constructor() {
    super();
    this.name = DUPLICATE_KEY_ERROR;
  }
}
