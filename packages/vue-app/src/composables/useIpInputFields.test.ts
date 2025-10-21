import { useIpInputFields } from './useIpInputFields';

describe('useIpInputFields', () => {
  it('initializes with one empty input', () => {
    const { inputs } = useIpInputFields();

    expect(inputs.value).toHaveLength(1);
    expect(inputs.value[0]).toEqual({
      id: 1,
      value: '',
      isLoading: false,
      error: null,
      result: null,
    });
  });

  it('adds a new input when addInput is called', () => {
    const { inputs, addInput } = useIpInputFields();

    addInput();

    expect(inputs.value).toHaveLength(2);
    expect(inputs.value[1]).toEqual({
      id: 2,
      value: '',
      isLoading: false,
      error: null,
      result: null,
    });
  });

  it('adds multiple inputs with unique IDs', () => {
    const { inputs, addInput } = useIpInputFields();

    addInput();
    addInput();
    addInput();

    expect(inputs.value).toHaveLength(4);

    const ids = inputs.value.map((input) => input.id);
    expect(ids).toEqual([1, 2, 3, 4]);
  });

  it('removes input by ID', () => {
    const { inputs, addInput, removeInput } = useIpInputFields();

    addInput();
    addInput();

    expect(inputs.value).toHaveLength(3);

    removeInput(2);

    expect(inputs.value).toHaveLength(2);
    expect(inputs.value.map((input) => input.id)).toEqual([1, 3]);
  });

  it('updates input by ID', () => {
    const { inputs, updateInput } = useIpInputFields();

    const updatedInput = {
      id: 1,
      value: '8.8.8.8',
      isLoading: true,
      error: 'Some error',
      result: { country: 'US', timezone: 'America/New_York' },
    };

    updateInput(updatedInput);

    expect(inputs.value[0]).toEqual(updatedInput);
  });

  it('updates only the matching input when multiple inputs exist', () => {
    const { inputs, addInput, updateInput } = useIpInputFields();

    addInput();
    addInput();

    const updatedInput = {
      id: 2,
      value: '1.1.1.1',
      isLoading: false,
      error: null,
      result: { country: 'AU', timezone: 'Australia/Sydney' },
    };

    updateInput(updatedInput);

    expect(inputs.value).toHaveLength(3);
    expect(inputs.value[1]).toEqual(updatedInput);

    expect(inputs.value[0].id).toBe(1);
    expect(inputs.value[0].value).toBe('');
    expect(inputs.value[2].id).toBe(3);
    expect(inputs.value[2].value).toBe('');
  });

  it('computed properties work correctly', () => {
    const { inputCount, hasInputs, canRemoveInputs, activeInputs, addInput, updateInput } = useIpInputFields();

    expect(inputCount.value).toBe(1);
    expect(hasInputs.value).toBe(true);
    expect(canRemoveInputs.value).toBe(false);
    expect(activeInputs.value).toHaveLength(0);

    addInput();
    expect(inputCount.value).toBe(2);
    expect(canRemoveInputs.value).toBe(true);

    updateInput({
      id: 1,
      value: '8.8.8.8',
      isLoading: false,
      error: null,
      result: null,
    });

    updateInput({
      id: 2,
      value: '  ',
      isLoading: false,
      error: null,
      result: null,
    });

    expect(activeInputs.value).toHaveLength(1);
    expect(activeInputs.value[0].value).toBe('8.8.8.8');
  });

  it('clearAllInputs resets to initial state', () => {
    const { inputs, addInput, updateInput, clearAllInputs } = useIpInputFields();

    addInput();
    addInput();
    updateInput({
      id: 1,
      value: '8.8.8.8',
      isLoading: true,
      error: 'Some error',
      result: { country: 'US', timezone: 'America/New_York' },
    });

    expect(inputs.value).toHaveLength(3);
    expect(inputs.value[0].value).toBe('8.8.8.8');

    clearAllInputs();

    expect(inputs.value).toHaveLength(1);
    expect(inputs.value[0]).toEqual({
      id: 1,
      value: '',
      isLoading: false,
      error: null,
      result: null,
    });
  });

  it('cannot remove inputs when only one exists', () => {
    const { inputs, removeInput, canRemoveInputs } = useIpInputFields();

    expect(canRemoveInputs.value).toBe(false);
    
    removeInput(1);

    expect(inputs.value).toHaveLength(1);
    expect(inputs.value[0].id).toBe(1);
  });
});