import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ListComponent from "./ListComponent";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "body", headerName: "Body", width: 400 },
];

const TableComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (response.ok) {
          const data: Post[] = await response.json();
          setPosts(data);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          paddingTop: 20,
          paddingBottom: 5,
          textDecorationLine: "underline",
        }}
      >
        Table Component
      </h1>
      <div
        style={{
          height: 400,
          width: "85%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataGrid rows={posts} columns={columns} checkboxSelection />
      </div>
      <div>
        <ListComponent />
      </div>
    </>
  );
};

export default TableComponent;
