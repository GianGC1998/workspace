import { validate } from 'class-validator';

export abstract class ValidatableConfig {
  async validate(): Promise<void> {
    const errors = await validate(this, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
  }
}
