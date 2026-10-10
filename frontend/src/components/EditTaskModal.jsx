import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateTaskSchema } from "../schemas/task.schema";
import tasksService from "../services/tasks.service";

export function EditTaskModal({
  task,
  onTaskUpdated,
  onClose,
}) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),

    defaultValues: {
      title: task.title,
      description: task.description || "",
      completed: task.completed,
    },

    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const updatedTask =
      await tasksService.update(task.id, data);

    if (onTaskUpdated) {
      onTaskUpdated(updatedTask);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              Editar tarea
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Modifica la información de la tarea
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Título
            </label>

            <input
              type="text"
              {...register("title")}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition"
            />

            {errors.title && (
              <p className="text-rose-400 text-xs mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descripción
            </label>

            <textarea
              rows="4"
              {...register("description")}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition resize-none"
            />

            {errors.description && (
              <p className="text-rose-400 text-xs mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">

            <input
              type="checkbox"
              {...register("completed")}
              className="w-4 h-4 accent-indigo-500"
            />

            Marcar como completada
          </label>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition cursor-pointer"
            >
              {isSubmitting
                ? "Guardando..."
                : "Guardar cambios"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}