import { create } from "zustand";
import { Staff, User } from "../types";
import { UserInfo } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type Store = {
  session: UserInfo | null;
  setSession: (payload: UserInfo) => void;
  users: User[];
  setUsers: (payload: User[]) => void;
  staffs: Staff[];
  setStaffs: (paoload: Staff[]) => void;
  isSidebar: boolean;
  toggleSidebar: (payload: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (payload) => set(() => ({ session: payload })),
  users: [],
  setUsers: (payload) => set(() => ({ users: payload })),
  staffs: [],
  getStaffs: async () => {
    const staffsCollection = collection(db, "staffs");
    const snapShot = await getDocs(staffsCollection);
    const newStaffs = snapShot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Staff)
    );
    set(() => ({ staffs: newStaffs }));
  },
  setStaffs: (payload) => set(() => ({ staffs: payload })),
  isSidebar: true,
  toggleSidebar: (payload) => set(() => ({ isSidebar: payload })),
}));
