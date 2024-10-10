import {  insertTables, updateTables } from "../../../assets/types";
import { supabase } from "../../app/lib/Subabase";
import {  useMutation, useQueryClient} from "@tanstack/react-query";




export const useInsertOrdersItems = () => {


  
  
    return useMutation({
      async mutationFn(items: insertTables<'order_items'>[]) {
        const { error , data: newProduct} = await supabase
        .from("order_items")
        .insert(items )
        .select()
        
  
        if (error) {
          throw new Error(error.message); 
        }
        return newProduct;  // >>>>>>> importent to return value otherwise onSuccess will not work <<<<
      },
  
    });
  };

  export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn({ id, updatedField }: {id:number ,   updatedField:updateTables<'orders'>}) {
        const { data, error } = await supabase
          .from("orders")
          .update(updatedField)
          .eq("id", id)
          .select();
  
        if (error) {
          throw error;
        }
        return data;
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries(["orders"]);
        await queryClient.invalidateQueries(["orders", id]);
      },
      onError(error) {
        console.log(error);
      },
    });
  };