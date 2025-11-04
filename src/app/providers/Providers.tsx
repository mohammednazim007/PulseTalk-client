"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/app/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// export const Providers = ({ children }: { children: ReactNode }) => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// };

export const Providers = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
