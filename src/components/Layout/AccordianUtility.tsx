export function moveAccordionUp<T>(data: T[], index: number) {
  if (index === 0) return; // Can't move the first item up
  else {
    const newData = [...data];
    [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
    return newData;
  }
}

export function moveAccordionDown<T>(data: T[], index: number) {
  if (index == data.length - 1) return; // Can't move the last item down
  else {
    const newData = [...data];
    [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
    return newData;
  }
}
