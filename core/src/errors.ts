export class DuplicateKeyError extends Error {
	constructor() {
		super();
		this.name = "DuplicateKeyError";
	}
}

export class InvalidKeyError extends Error {
	constructor() {
		super();
		this.name = "InvalidKeyError";
	}
}
