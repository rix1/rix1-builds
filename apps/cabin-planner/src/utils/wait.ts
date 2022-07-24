function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve('Success');
    }, 2000);
  });
}

export default wait;
