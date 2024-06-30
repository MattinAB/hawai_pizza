import {  OrderStatus, Tables , insertTables } from "@/assets/types";
import { supabase } from "@/src/app/lib/Subabase";
import { useAuth } from "@/src/app/provider/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Order = Tables<"orders">;

export const useMyOrders =()=>{

const {sessions} = useAuth()
const user = sessions?.user 

    return useQuery<Order[]>({
        queryKey: ['orders' , {userId:user?.id }],
        queryFn : async()=> {
            if(!user) return []
            const {data , error} = await supabase.from('orders')
            .select('*')
            .eq('user_id', user.id)  
            .order('created_at', { ascending: false });  
            
            if(error) throw new Error(error.message)
                return data ; // Add type assertion to ensure the return type is Order[]
        }
    })
}


export const useOrderList =({archived=false}:{archived:boolean})=>{
const statuses : OrderStatus[] =  archived ? ['Delivered'] :['New' , 'Cooking', 'Delivering']

    return useQuery<Order[]>({
        queryKey:['orders' , {archived}],
        queryFn : async()=>{
            const {data, error} = await supabase.from('orders')
            .select('*')
            .in('status', statuses)
            .order('created_at', { ascending: false });

            if(error) throw new Error(error.message)
                return data 
        }
    })
}




export const useOrderDetails = (id: number) => {
    return useQuery({
      queryKey: ["orders", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("orders")
          .select('*, order_items(*, products(*))')
          .eq("id", id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };



  export const useInsertOrders = () => {

    const {sessions} = useAuth()
    const userId = sessions?.user.id


    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: insertTables<'orders'>) {
        const { error , data: newProduct} = await supabase
        .from("orders")
        .insert({...data , user_id : userId})
        .select()
        .single();
  
        if (error) {
          throw new Error(error.message); 
        }
        return newProduct;  // >>>>>>> importent to return value otherwise onSuccess will not work <<<<
      },
      async onSuccess(data) {
        await queryClient.invalidateQueries(["orders"]);
      },
      onError(error) {
        console.log(error);
      },
    });
  };