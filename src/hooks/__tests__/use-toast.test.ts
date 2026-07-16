import { reducer } from '../use-toast';

describe('useToast reducer', () => {
  const initialState = { toasts: [] };

  it('should add a new toast (ADD_TOAST)', () => {
    const toast1 = { id: '1', title: 'Test 1' };
    const action: any = { type: 'ADD_TOAST', toast: toast1 };
    const state = reducer(initialState, action);

    expect(state.toasts.length).toBe(1);
    expect(state.toasts[0]).toEqual(toast1);
  });

  it('should respect TOAST_LIMIT when adding toasts (ADD_TOAST)', () => {
    // Note: TOAST_LIMIT is 1 according to the source file
    const stateWithOneToast = { toasts: [{ id: '1', title: 'Test 1' } as any] };
    const newToast = { id: '2', title: 'Test 2' };
    const action: any = { type: 'ADD_TOAST', toast: newToast };

    const state = reducer(stateWithOneToast, action);

    expect(state.toasts.length).toBe(1);
    expect(state.toasts[0]).toEqual(newToast); // The newest toast should replace the old one due to limit 1
  });

  it('should update an existing toast (UPDATE_TOAST)', () => {
    const state = { toasts: [{ id: '1', title: 'Old Title', open: true } as any] };
    const action: any = { type: 'UPDATE_TOAST', toast: { id: '1', title: 'New Title' } };

    const nextState = reducer(state, action);

    expect(nextState.toasts.length).toBe(1);
    expect(nextState.toasts[0].title).toBe('New Title');
    expect(nextState.toasts[0].open).toBe(true); // Should preserve other properties
  });

  it('should ignore UPDATE_TOAST if toast does not exist', () => {
    const state = { toasts: [{ id: '1', title: 'Test 1' } as any] };
    const action: any = { type: 'UPDATE_TOAST', toast: { id: '2', title: 'Test 2' } };

    const nextState = reducer(state, action);

    expect(nextState.toasts).toEqual(state.toasts);
  });

  it('should dismiss a specific toast by setting open to false (DISMISS_TOAST)', () => {
    const state = {
      toasts: [
        { id: '1', open: true } as any,
        { id: '2', open: true } as any
      ]
    };
    const action: any = { type: 'DISMISS_TOAST', toastId: '1' };

    const nextState = reducer(state, action);

    expect(nextState.toasts[0].open).toBe(false);
    expect(nextState.toasts[1].open).toBe(true);
  });

  it('should dismiss all toasts if no toastId is provided (DISMISS_TOAST)', () => {
    const state = {
      toasts: [
        { id: '1', open: true } as any,
        { id: '2', open: true } as any
      ]
    };
    const action: any = { type: 'DISMISS_TOAST' }; // No toastId

    const nextState = reducer(state, action);

    expect(nextState.toasts[0].open).toBe(false);
    expect(nextState.toasts[1].open).toBe(false);
  });

  it('should remove a specific toast (REMOVE_TOAST)', () => {
    const state = {
      toasts: [
        { id: '1' } as any,
        { id: '2' } as any
      ]
    };
    const action: any = { type: 'REMOVE_TOAST', toastId: '1' };

    const nextState = reducer(state, action);

    expect(nextState.toasts.length).toBe(1);
    expect(nextState.toasts[0].id).toBe('2');
  });

  it('should remove all toasts if no toastId is provided (REMOVE_TOAST)', () => {
    const state = {
      toasts: [
        { id: '1' } as any,
        { id: '2' } as any
      ]
    };
    const action: any = { type: 'REMOVE_TOAST' }; // No toastId

    const nextState = reducer(state, action);

    expect(nextState.toasts.length).toBe(0);
  });
});
