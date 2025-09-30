import { useEffect, useState } from "react";

function VariantCard({ variant = {}, onChange, onRemove, errors }) {
  const [color, setColor] = useState(variant?.color?.name || "");

  const [stocks, setStocks] = useState(() => {
    const defaultStocks = { S: 0, M: 0, L: 0, XL: 0 };
    if (variant && variant.sizes) {
      variant.sizes.forEach((item) => {
        const size = item.size;
        const stock = item.stock;
        defaultStocks[size] = stock || 0;
      });
    }
    return defaultStocks;
  });

  // cập nhật lên cha mỗi khi thay đổi
  useEffect(() => {
    onChange({
      color: { name: color },
      sizes: Object.entries(stocks).map(([size, stock]) => ({
        size,
        stock,
      })),
    });
  }, [color, stocks]); // color và stocks

  const handleStockChange = (size, value) => {
    setStocks((prev) => ({ ...prev, [size]: Number(value) }));
  };

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase text-slate-500">
            Màu sắc
          </div>
          <div className="flex justify-between items-center">
            <input
              className={`inputClass mt-1`}
              placeholder="Ví dụ: trắng / đen"
              value={color}
              onChange={(e) => setColor(e.target.value.toLowerCase())}
            />
            <button
              onClick={onRemove}
              className="ml-3 px-2 py-1 text-xs text-red-600 border border-red-300 rounded hover:bg-red-50"
            >
              Xoá
            </button>
          </div>
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          {/* {!color && (
            <span className="text-red-400 text-sm">Vui lòng nhập màu sắc</span>
          )} */}
        </div>
      </div>

      <table className="min-w-[280px] w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
          <tr>
            <th className="px-4 py-2 text-left">Size</th>
            <th className="px-4 py-2 text-left">Tồn kho</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {["S", "M", "L", "XL"].map((size) => (
            <tr key={size}>
              <td className="px-4 py-2 font-medium">{size}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-20 border rounded px-2 py-1 text-sm"
                  min="0"
                  value={stocks[size]}
                  onChange={(e) => handleStockChange(size, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VariantCard;
