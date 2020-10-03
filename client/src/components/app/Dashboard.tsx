import React from "react";

const Dashboard: React.FC = () => {
  return <div>
      <div>hejjjjjjj uff</div>


  </div>
};

export default Dashboard;


// import * as React from "react";
// import { IconsLayer, QueryLoading } from ".";
// import { useEventsHook } from "../generated/apolloComponents";

// interface IconsLayerProps {
//   [...]
// }

// export const EventsSitesIcons: React.FC<IconsLayerProps> = React.memo(props => {
//   const {data, loading, error} = useEventsHook();

//   return (
//     if (loading) return <QueryLoading />;
//         if (error) return <p>Error....</p>;

//         if (data && data.nodeQuery) {
//           return (
//             <IconsLayer
//               [...]
//             />
//           );
//         }
//         return null;
//   )
// });
