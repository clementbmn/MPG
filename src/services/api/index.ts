const url = 'https://api.monpetitgazon.com';

const get: any = async (path: string) => {
  try {
    const result = await fetch(`${url}${path}`);
    const data = await result.json();
    return data;
  } catch (err) {
    // We could insert a custom error handling here in a bigger application
    console.log(`Error getting ${path}`);
    throw err;
  }
}

export {
  get,
}
