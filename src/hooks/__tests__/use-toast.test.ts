import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { reducer } from '../use-toast';

describe('use-toast reducer', () => {
  const initialState = { toasts: [] };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('ADD_TOAST', () => {
    it('should add a toast to the state', () => {
      const toast = { id: '1', title: 'Test Toast', open: true };
      const action = { type: 'ADD_TOAST' as const, toast };

      const nextState = reducer(initialState, action);

      expect(nextState.toasts).toHaveLength(1);
      expect(nextState.toasts[0]).toEqual(toast);
    });

    it('should respect the TOAST_LIMIT (1)', () => {
      const toast1 = { id: '1', title: 'First Toast', open: true };
      const toast2 = { id: '2', title: 'Second Toast', open: true };

      const state1 = reducer(initialState, { type: 'ADD_TOAST', toast: toast1 });
      const state2 = reducer(state1, { type: 'ADD_TOAST', toast: toast2 });

      // TOAST_LIMIT is 1, so the new toast replaces the old one
      expect(state2.toasts).toHaveLength(1);
      expect(state2.toasts[0]).toEqual(toast2);
    });
  });

  describe('UPDATE_TOAST', () => {
    it('should update an existing toast', () => {
      const toast = { id: '1', title: 'Original Title', open: true };
      const state = { toasts: [toast] };

      const action = { type: 'UPDATE_TOAST' as const, toast: { id: '1', title: 'Updated Title' } };
      const nextState = reducer(state, action);

      expect(nextState.toasts[0].title).toBe('Updated Title');
      expect(nextState.toasts[0].open).toBe(true);
    });

    it('should not modify state if toast id does not exist', () => {
      const toast = { id: '1', title: 'Original Title', open: true };
      const state = { toasts: [toast] };

      const action = { type: 'UPDATE_TOAST' as const, toast: { id: '2', title: 'Updated Title' } };
      const nextState = reducer(state, action);

      expect(nextState.toasts[0].title).toBe('Original Title');
    });
  });

  describe('DISMISS_TOAST', () => {
    it('should dismiss a specific toast by setting open to false', () => {
      const toast1 = { id: '1', title: 'Toast 1', open: true };
      const toast2 = { id: '2', title: 'Toast 2', open: true };
      const state = { toasts: [toast1, toast2] };

      const action = { type: 'DISMISS_TOAST' as const, toastId: '1' };
      const nextState = reducer(state, action);

      expect(nextState.toasts[0].open).toBe(false);
      expect(nextState.toasts[1].open).toBe(true);
    });

    it('should dismiss all toasts if no toastId is provided', () => {
      const toast1 = { id: '1', title: 'Toast 1', open: true };
      const toast2 = { id: '2', title: 'Toast 2', open: true };
      const state = { toasts: [toast1, toast2] };

      const action = { type: 'DISMISS_TOAST' as const };
      const nextState = reducer(state, action);

      expect(nextState.toasts[0].open).toBe(false);
      expect(nextState.toasts[1].open).toBe(false);
    });
  });

  describe('REMOVE_TOAST', () => {
    it('should remove a specific toast', () => {
      const toast1 = { id: '1', title: 'Toast 1', open: true };
      const toast2 = { id: '2', title: 'Toast 2', open: true };
      const state = { toasts: [toast1, toast2] };

      const action = { type: 'REMOVE_TOAST' as const, toastId: '1' };
      const nextState = reducer(state, action);

      expect(nextState.toasts).toHaveLength(1);
      expect(nextState.toasts[0].id).toBe('2');
    });

    it('should remove all toasts if no toastId is provided', () => {
      const toast1 = { id: '1', title: 'Toast 1', open: true };
      const toast2 = { id: '2', title: 'Toast 2', open: true };
      const state = { toasts: [toast1, toast2] };

      const action = { type: 'REMOVE_TOAST' as const };
      const nextState = reducer(state, action);

      expect(nextState.toasts).toHaveLength(0);
    });
  });
});
