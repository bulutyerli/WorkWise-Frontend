import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

const mockCategories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
];

const keyCreator = (item: { id: number; name: string }) => item.id;
const option = (item: { name: string }) => item.name;

describe('CategoryFilter Component', () => {
  it('renders correctly with categories', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        onFilterSelect={() => {}}
        selectedCategory={mockCategories[0]}
        keyCreator={keyCreator}
        option={option}
        title="Select Category"
      />
    );

    expect(screen.getByLabelText('Select Category')).toBeInTheDocument();

    expect(
      screen.getByRole('option', { name: 'Category 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Category 2' })
    ).toBeInTheDocument();
  });

  it('calls onFilterSelect with the correct value when an option is selected', () => {
    const mockOnFilterSelect = vi.fn();

    render(
      <CategoryFilter
        categories={mockCategories}
        onFilterSelect={mockOnFilterSelect}
        selectedCategory={mockCategories[0]}
        keyCreator={keyCreator}
        option={option}
        title="Select Category"
      />
    );

    fireEvent.change(screen.getByLabelText('Select Category'), {
      target: { value: '2' },
    });

    expect(mockOnFilterSelect).toHaveBeenCalledWith('2');
  });

  it('renders "All" option when addAll is true', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        onFilterSelect={() => {}}
        selectedCategory={mockCategories[0]}
        keyCreator={keyCreator}
        option={option}
        title="Select Category"
        addAll={true}
      />
    );

    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
  });
});
