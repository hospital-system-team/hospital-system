import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDoctorsCtx } from "../../Context/DoctorContext";

const urlRegex =
  /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:[0-9]+)?(\/[^\s?#]*)?(\?[^#\s]*)?(#\S*)?$/i;

export default function DoctorDialog() {
  const { isFormOpen, closeForm, mode, selectedDoctor, saveDoctor } =
    useDoctorsCtx();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", phone: "", shift: "", img: "" },
  });

  useEffect(() => {
    reset(selectedDoctor || { name: "", phone: "", shift: "", img: "" });
  }, [selectedDoctor, reset]);

  const onSubmit = async (data) => {
    await saveDoctor(data);
  };

  return (
    <Dialog open={isFormOpen} onClose={closeForm} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit Doctor" : "Add Doctor"}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full rounded"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}

            <input
              type="text"
              placeholder="Phone"
              className="border p-2 w-full rounded"
              {...register("phone")}
            />

            <select
              className="border p-2 w-full rounded"
              {...register("shift", { required: "Shift is required" })}>
              <option value="">Select Shift</option>
              <option value="am">Morning</option>
              <option value="pm">Evening</option>
            </select>
            {errors.shift && (
              <p className="text-red-600 text-sm">{errors.shift.message}</p>
            )}

            <input
              type="url"
              placeholder="Image URL (https://...)"
              className="border p-2 w-full rounded"
              {...register("img", {
                required: "Image URL is required",
                pattern: { value: urlRegex, message: "Enter a valid URL" },
              })}
            />
            {errors.img && (
              <p className="text-red-600 text-sm">{errors.img.message}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-60">
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
