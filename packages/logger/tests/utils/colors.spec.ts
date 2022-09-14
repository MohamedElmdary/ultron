import {v1} from "uuid";
import {ColorsMixin, Colors} from "../../lib/utils";

class MockMessage extends ColorsMixin {
  constructor(public message: string) {
    super();
  }
}

describe("Utils [Colors]", () => {
  let msg: string;
  let mock: any;

  beforeEach(() => {
    msg = v1();
    mock = new MockMessage(msg);
  });

  for (const color in Colors) {
    test(`Should wrap with ${color}`, () => {
      mock[color]();
      expect(mock.message).toEqual(Colors[color] + msg + Colors[color]);
    });
  }

  test("Should wrap in black, white", () => {
    mock.black().white();
    expect(mock.message).toEqual(Colors.white + Colors.black + msg + Colors.black + Colors.white);
  });

  test("Should wrap in cyan & white & black, red.", () => {
    mock.cyan().white().black().red();
    expect(mock.message).toEqual(
      Colors.red +
        Colors.black +
        Colors.white +
        Colors.cyan +
        msg +
        Colors.cyan +
        Colors.white +
        Colors.black +
        Colors.red
    );
  });
});
