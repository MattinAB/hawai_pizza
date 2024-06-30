import { supabase } from "@/src/app/lib/Subabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


export const useOrderSubscription =()=>{
    const queryClient = useQueryClient();

    useEffect(() => {
        const orderSubscription = supabase
          .channel('custom-insert-channel')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'orders' },
            (payload) => {
              console.log('Change received!', payload);
                queryClient.invalidateQueries(['orders']);
            }
          )
          .subscribe();
        return () => {
          orderSubscription.unsubscribe();
        };
      },[]);


}

export const useUpdateOrderSubcription = (id:number)=>{

  const queryClient = useQueryClient();


  useEffect(() => {
    const orders = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries(['orders',id]);
        }
      )
      .subscribe();
  
    return () => {
      orders.unsubscribe();
    };
  },[]);

}