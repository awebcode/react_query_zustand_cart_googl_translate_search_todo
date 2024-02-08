export const fethQueryData = async ({ pageParam = 0 }: { pageParam: any }) => {
  const res = await fetch(`http://localhost:4000?limit=${10}&skip=${pageParam}`);
  const data = await res.json();
  console.log({ pageParam });
  return { ...data, skip: pageParam, prevOffset: pageParam };
};
//&skip=${pageParam}
//https://jsonplaceholder.typicode.com/posts
//https://dummyjson.com/products?limit=${1000}
type Tdata = {
  title: string;
  body: string;
  description?: string;
};
// Function to create or update data
export const postData = async (data: Tdata) => {
  // For simplicity, let's assume this endpoint supports both POST and PUT

  const res = await fetch(`https://dummyjson.com/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const postTodoData = async (body: any) => {
  const res = await fetch(`http://localhost:4000/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const fethTodoData = async ({ pageParam = 0 }: { pageParam: any }) => {
  const res = await fetch(`http://localhost:4000/get?limit=${5}&skip=${pageParam}`);
  const data = await res.json();
  return { ...data, prevOffset: pageParam, limit: 5 };
};
export const fethTodoDataWithoutInfinite = async () => {
  const res = await fetch(`http://localhost:4000/get`);
  const data = await res.json();
  return data;
};
//single todo
export const getSingleTodo = async (id:number) => {
  const res = await fetch(`http://localhost:4000/single/${id}`);
  const data = await res.json();
  return data;
};
export const updateTodoData = async (body: any, id: number) => {
  const res = await fetch(`http://localhost:4000/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const deleteTodoData = async (id: number) => {
  const res = await fetch(`http://localhost:4000/delete/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
