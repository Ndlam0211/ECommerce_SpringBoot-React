// import React from "react";
// import {
//   List,
//   useRedirect,
//   useNotify,
//   useRefresh,
//   useRecordContext,
//   ReferenceField,
//   TextField,
//   Show,
//   SimpleShowLayout,
//   NumberField,
//   ArrayField,
//   ImageField,
//   Datagrid,
//   Identifier,
// } from "react-admin";
// import PDFButton from "./PDFButton";

// // Custom Button Component
// const CustomPDFButton = () => {
//   const record = useRecordContext();
//   if (!record) {
//     return <span>Loading...</span>;
//   }
//   if (!record.id) {
//     return <span>No cart ID</span>;
//   }
//   return <PDFButton />;
// };

// // List Component
// export const CartList = () => {
//   const redirect = useRedirect()
//   const handleRowClick = (
//     id: Identifier | undefined,
//     resource: string | undefined,
//     record: { email: string }
//   ) => {
//     if (id && record) {
//       localStorage.setItem("globalCartId", id.toString());
//       localStorage.setItem("globalEmailCart", record.email);
//       redirect("show", resource, id);
//     }
//   };

//   return (
//     <List>
//       <Datagrid rowClick={handleRowClick}>
//         <TextField source="cart.cartId" label="Cart ID" />
//         <TextField source="cart.totalPrice" label="Total Price" />
//         <TextField source="email" label="Email" />
//       </Datagrid>
//     </List>
//   );
// };

// // Show Component
// export const CartShow = () => {
//   const notify = useNotify();
//   const refresh = useRefresh();
//   const redirect = useRedirect();
//   const email = localStorage.getItem("globalEmailCart");

//   if (!email) {
//     return <span>Error: Email is required</span>;
//   }

//   const onError = (error: { message: string }) => {
//     notify(`Could not load cart: ${error.message}`, { type: "error" });
//     redirect("/carts");
//     refresh();
//   };

//   return (
//     <Show
//       resource="carts"
//       id={localStorage.getItem("globalCartId")}
//       queryOptions={{ meta: { email } }}
//       onFailure={onError}
//     >
//       <SimpleShowLayout>
//         <CustomPDFButton />
//         <TextField source="id" label="Cart ID" />
//         <NumberField source="totalPrice" label="Total Price" />
//         <ArrayField source="products" label="Products">
//           <Datagrid>
//             <TextField source="id" label="Product ID" />
//             <TextField source="productName" label="Product Name" />
//             <ImageField source="image" label="Image" />
//             <TextField source="description" label="Description" />
//             <NumberField source="quantity" label="Quantity" />
//             <NumberField source="price" label="Price" />
//             <NumberField source="discount" label="Discount" />
//             <NumberField source="specialPrice" label="Special Price" />
//             <ReferenceField
//               source="category.categoryId"
//               reference="categories"
//               label="Category"
//             >
//               <TextField source="categoryName" />
//             </ReferenceField>
//           </Datagrid>
//         </ArrayField>
//       </SimpleShowLayout>
//     </Show>
//   );
// };

import React, { useState, useEffect } from "react";
import {
  List,
  useRecordContext,
  ReferenceField,
  TextField,
  Show,
  SimpleShowLayout,
  NumberField,
  ArrayField,
  Datagrid,
} from "react-admin";
import PDFButton from "./PDFButton";

// CustomImageField component
const CustomImageField = ({ source }) => {
  const record = useRecordContext();
  const token = localStorage.getItem("jwt-token");
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (record && record[source] && token) {
      const fetchImage = async () => {
        try {
          const response = await fetch(`${record[source]}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      fetchImage();
    }
  }, [record, source, token]);

  if (!record || !record[source]) {
    return <span>No Image</span>;
  }

  return <img src={imageSrc} alt="Product" style={{ maxWidth: "100px" }} />;
};

// CustomPDFButton component
// CustomPDFButton component
const CustomPDFButton = () => {
  const record = useRecordContext();

  useEffect(() => {
    if (record && record.id) {
      console.log("record:",record)
      localStorage.setItem("cartId", record.id.toString());
      localStorage.setItem("globalEmailCart", record.userId);
    }
  }, [record]);

  if (!record) {
    return <span>Loading...</span>;
  }

  if (!record.id) {
    return <span>No cart ID</span>;
  }

  return <PDFButton />;
};

// CartList component
export const CartList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="cartId" label="Cart ID" />
        <TextField source="totalPrice" label="Total Price" />
      </Datagrid>
    </List>
  );
};

// CartShow component
export const CartShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <CustomPDFButton />
        <TextField source="cartId" label="Cart ID" />
        <NumberField source="totalPrice" label="Total Price" />
        <ArrayField source="products" label="Products">
          <Datagrid>
            <TextField source="productId" label="Product ID" />
            <TextField source="productName" label="Product Name" />
            <CustomImageField source="image" label="Image" />
            <TextField source="description" label="Description" />
            <NumberField source="quantity" label="Quantity" />
            <NumberField source="price" label="Price" />
            <NumberField source="discount" label="Discount" />
            <NumberField source="specialPrice" label="Special Price" />
            <ReferenceField
              source="category.categoryId"
              reference="categories"
              label="Category"
            >
              <TextField source="categoryName" />
            </ReferenceField>
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
