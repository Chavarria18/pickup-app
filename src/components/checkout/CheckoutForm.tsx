import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema,type DatosCliente } from "../../schema/checkoutSchema";

interface Props {
  onSubmit: (datos: DatosCliente) => void | Promise<void>;
  enviando: boolean;
}

export default function CheckoutForm({ onSubmit, enviando }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosCliente>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { nombreCliente: "", telefono: "", correo: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label htmlFor="nombreCliente" className="form-label">Nombre cliente *</label>
        <input
          id="nombreCliente"
          className={`form-control ${errors.nombreCliente ? "is-invalid" : ""}`}
          autoComplete="name"
          {...register("nombreCliente")}
        />
        <div className="invalid-feedback">{errors.nombreCliente?.message}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">Telefono *</label>
        <input
          id="telefono"
          type="tel"
          className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
          autoComplete="tel"
          {...register("telefono")}
        />
        <div className="invalid-feedback">{errors.telefono?.message}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="correo" className="form-label">Email (opcional)</label>
        <input
          id="correo"
          type="email"
          className={`form-control ${errors.correo ? "is-invalid" : ""}`}
          autoComplete="email"
          {...register("correo")}
        />
        <div className="invalid-feedback">{errors.correo?.message}</div>
      </div>

      <button type="submit" className="btn btn-success w-100" disabled={enviando}>
        {enviando ? "Cargando..." : "Confirmar"}
      </button>
    </form>
  );
}