export default function createInt8TypedArray(length, position, value) {
  if (position < 0 || position >= length) {
    throw new Error('Position outside range');
  }

  // Create a new ArrayBuffer of specified length
  const buffer = new ArrayBuffer(length);

  // Create a DataView to access/manipulate the buffer
  const view = new DataView(buffer);

  // Set the Int8 value at the specified position
  view.setInt8(position, value);

  // Return the DataView object
  return view;
}
