import { render, screen } from '@testing-library/react';
import ReverseString from './ReverseString';

test('Корректное отображение исходной строки', () => {
  // arrange
  render(<ReverseString />);

  // act
  const sourceString = screen.getByTestId('sourceString');

  //assert
  expect(sourceString).toBeInTheDocument();
});

test('Корректное отображение перевернутой строки', () => {
  render(<ReverseString />);
  const sourceString = screen.getByTestId('sourceString');
  const reverseString = screen.getByTestId('reverseString');
  expect(sourceString.value).toEqual(reverseString.value);
});
