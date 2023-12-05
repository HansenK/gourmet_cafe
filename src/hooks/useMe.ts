import { useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => supabase.auth.getUser().then((res) => res.data.user),
  });
};

export default useMe;
