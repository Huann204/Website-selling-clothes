import { ImagePlus, Upload } from "lucide-react";

function UploadBox({ title, hint, multi, onChange }) {
  const inputId = `upload-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6 text-center">
      <ImagePlus className="h-8 w-8 text-slate-400" />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-slate-500">{hint}</div>

      <input
        id={inputId}
        type="file"
        multiple={multi}
        className="hidden"
        onChange={onChange}
      />

      <label
        htmlFor={inputId}
        className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-100 w-full sm:w-auto"
      >
        <Upload className="h-4 w-4" />
        {multi ? "Tải nhiều ảnh" : "Tải ảnh"}
      </label>
    </div>
  );
}
export default UploadBox;
