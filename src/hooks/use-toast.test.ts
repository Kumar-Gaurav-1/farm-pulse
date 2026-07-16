import { test, describe, mock, afterEach } from "node:test";
import assert from "node:assert";
import { reducer } from "./use-toast";

describe("useToast reducer", () => {
  afterEach(() => {
    mock.timers.reset();
  });

  test("ADD_TOAST adds a toast and respects TOAST_LIMIT", () => {
    const initialState = { toasts: [] };
    const toast1 = { id: "1", title: "Toast 1", open: true };
    const toast2 = { id: "2", title: "Toast 2", open: true };

    const state1 = reducer(initialState, {
      type: "ADD_TOAST",
      toast: toast1,
    });

    assert.strictEqual(state1.toasts.length, 1);
    assert.deepStrictEqual(state1.toasts[0], toast1);

    // Add a second toast. Since TOAST_LIMIT is 1, it should replace the first one.
    const state2 = reducer(state1, {
      type: "ADD_TOAST",
      toast: toast2,
    });

    assert.strictEqual(state2.toasts.length, 1);
    assert.deepStrictEqual(state2.toasts[0], toast2);
  });

  test("UPDATE_TOAST updates an existing toast", () => {
    const toast = { id: "1", title: "Initial Title", open: true };
    const initialState = { toasts: [toast] };

    const updatedState = reducer(initialState, {
      type: "UPDATE_TOAST",
      toast: { id: "1", title: "Updated Title" },
    });

    assert.strictEqual(updatedState.toasts.length, 1);
    assert.strictEqual(updatedState.toasts[0].title, "Updated Title");
    assert.strictEqual(updatedState.toasts[0].open, true); // Other properties remain
  });

  test("UPDATE_TOAST does not affect other toasts", () => {
    const toast1 = { id: "1", title: "Title 1" };
    const toast2 = { id: "2", title: "Title 2" };
    const initialState = { toasts: [toast1, toast2] };

    const updatedState = reducer(initialState, {
      type: "UPDATE_TOAST",
      toast: { id: "1", title: "Updated Title 1" },
    });

    assert.strictEqual(updatedState.toasts[0].title, "Updated Title 1");
    assert.strictEqual(updatedState.toasts[1].title, "Title 2");
  });

  test("DISMISS_TOAST sets open to false for a specific toast", () => {
    // DISMISS_TOAST calls setTimeout in addToRemoveQueue.
    mock.timers.enable({ apis: ["setTimeout"] });

    const toast1 = { id: "1", open: true };
    const toast2 = { id: "2", open: true };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, {
      type: "DISMISS_TOAST",
      toastId: "1",
    });

    assert.strictEqual(state.toasts[0].open, false);
    assert.strictEqual(state.toasts[1].open, true);
  });

  test("DISMISS_TOAST sets open to false for all toasts if toastId is undefined", () => {
    mock.timers.enable({ apis: ["setTimeout"] });

    const toast1 = { id: "1", open: true };
    const toast2 = { id: "2", open: true };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, {
      type: "DISMISS_TOAST",
    });

    assert.strictEqual(state.toasts[0].open, false);
    assert.strictEqual(state.toasts[1].open, false);
  });

  test("REMOVE_TOAST removes a specific toast", () => {
    const toast1 = { id: "1", open: false };
    const toast2 = { id: "2", open: true };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, {
      type: "REMOVE_TOAST",
      toastId: "1",
    });

    assert.strictEqual(state.toasts.length, 1);
    assert.strictEqual(state.toasts[0].id, "2");
  });

  test("REMOVE_TOAST removes all toasts if toastId is undefined", () => {
    const toast1 = { id: "1", open: false };
    const toast2 = { id: "2", open: false };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, {
      type: "REMOVE_TOAST",
    });

    assert.strictEqual(state.toasts.length, 0);
  });
});
