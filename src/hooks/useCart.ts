import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tienda } from "../model/Store";
import type { Producto } from "../model/Product";
import type { CartModel } from "../model/CartModel";

interface CarritoState {
  tienda: Tienda | null;
  items: CartModel[];
  seleccionarTienda: (tienda: Tienda) => void;
  agregar: (producto: Producto) => void;
  incrementar: (productoId: string) => void;
  disminuir: (productoId: string) => void;
  eliminar: (productoId: string) => void;
  vaciar: () => void;
}

export const useCarritoStore = create<CarritoState>()(
  persist(
    (set) => ({
      tienda: null,
      items: [],

      seleccionarTienda: (tienda) =>
        set((s) => ({
          tienda,
          items: s.tienda?.id === tienda.id ? s.items : [],
        })),

      agregar: (p) =>
        set((s) => {
          const existe = s.items.find((i) => i.productoId === p.id);
          if (existe) {
            return {
              items: s.items.map((i) =>
                i.productoId === p.id && i.cantidad < i.disponibilidad
                  ? { ...i, cantidad: i.cantidad + 1 }
                  : i
              ),
            };
          }
          return {
            items: [
              ...s.items,
              {
                productoId: p.id,
                nombre: p.nombre,
                precio: p.precio,
                imagen: p.imagen,
                cantidad: 1,
                disponibilidad: p.disponibilidad,
              },
            ],
          };
        }),

      incrementar: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productoId === id && i.cantidad < i.disponibilidad
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          ),
        })),

      disminuir: (id) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productoId === id ? { ...i, cantidad: i.cantidad - 1 } : i))
            .filter((i) => i.cantidad > 0),
        })),

      eliminar: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.productoId !== id) })),

      vaciar: () => set({ items: [] }),
    }),
    { name: "pickup-carrito" }
  )
);

export const selectTotal = (s: CarritoState) =>
  s.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

export const selectCantidadItems = (s: CarritoState) =>
  s.items.reduce((acc, i) => acc + i.cantidad, 0);