import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import supabase from "../Supabase/supabase_config";
import { DeleteDialogContext } from "./DeleteDialogContext";

export const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  // بيانات
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // حالات عرض/فورم
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit

  // توكنات
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  // من ديلوج الحذف العام
  const { openDeleteDialog } = useContext(DeleteDialogContext);

  // جلب
  const fetchDoctors = useCallback(async () => {
    await supabase.auth.setSession({ access_token, refresh_token });
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setDoctors(data || []);
  }, [access_token, refresh_token]);

  // فتح عرض
  const openView = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setIsViewOpen(true);
  }, []);
  const closeView = useCallback(() => {
    setSelectedDoctor(null);
    setIsViewOpen(false);
  }, []);

  // إضافة
  const openAdd = useCallback(() => {
    setMode("add");
    setIsFormOpen(true);
  }, []);
  // تعديل
  const openEdit = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setMode("edit");
    setIsFormOpen(true);
  }, []);
  const closeForm = useCallback(() => setIsFormOpen(false), []);

  // حفظ (insert | update) — formData: {name, phone, shift, img}
  const saveDoctor = useCallback(
    async (formData) => {
      await supabase.auth.setSession({ access_token, refresh_token });
      if (mode === "edit" && selectedDoctor?.id) {
        const { error } = await supabase
          .from("doctors")
          .update(formData)
          .eq("id", selectedDoctor.id);
        if (error) throw error;
        // حدّث المعروض لو مفتوح
        setSelectedDoctor((prev) => (prev ? { ...prev, ...formData } : prev));
      } else {
        const { error } = await supabase.from("doctors").insert([formData]);
        if (error) throw error;
      }
      await fetchDoctors();
      closeForm();
    },
    [access_token, refresh_token, fetchDoctors, mode, selectedDoctor, closeForm]
  );

  // حذف مباشر (بدون ديلوج تأكيد) — نستخدمه داخل كول باك ديلوج الحذف العام
  const deleteDoctor = useCallback(
    async (id) => {
      if (!id) return;
      await supabase.auth.setSession({ access_token, refresh_token });
      const { error } = await supabase.from("doctors").delete().eq("id", id);
      if (error) throw error;
      await fetchDoctors();
      // لو اللي بنعرضه هو اللي اتمسح، اقفل العرض
      setSelectedDoctor((prev) => {
        if (prev?.id === id) {
          setIsViewOpen(false);
          return null;
        }
        return prev;
      });
    },
    [access_token, refresh_token, fetchDoctors]
  );

  // فتح ديلوج حذف العام وتمرير كول باك
  const askDelete = useCallback(
    (doctor) => {
      if (!doctor?.id) return;
      openDeleteDialog(
        "doctor",
        { id: doctor.id, name: doctor.name },
        async () => {
          await deleteDoctor(doctor.id);
        }
      );
    },
    [openDeleteDialog, deleteDoctor]
  );

  const value = useMemo(
    () => ({
      // بيانات
      doctors,
      selectedDoctor,

      // حالات
      isViewOpen,
      isFormOpen,
      mode,

      // أكشنز
      fetchDoctors,
      openView,
      closeView,
      openAdd,
      openEdit,
      closeForm,
      saveDoctor,
      deleteDoctor, // مفيد لو عايز تستخدمه برا
      askDelete, // ده الأنسب مع DeleteDialogContext
    }),
    [
      doctors,
      selectedDoctor,
      isViewOpen,
      isFormOpen,
      mode,
      fetchDoctors,
      openView,
      closeView,
      openAdd,
      openEdit,
      closeForm,
      saveDoctor,
      deleteDoctor,
      askDelete,
    ]
  );

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
}

// هوك مريح
export const useDoctorsCtx = () => useContext(DoctorContext);
