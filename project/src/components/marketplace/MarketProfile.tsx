"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { PrivateProfile } from "@/lib/marketplace/validation";
import { marketRequest, useMarket } from "./MarketProvider";

export default function MarketProfile() {
  const { user, setUser } = useMarket();
  const [profile, setProfile] = useState<PrivateProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;
    marketRequest("auth")
      .then((data) => {
        if (alive) setProfile(data.profile);
      })
      .catch((err) => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const fields = [
      "name",
      "phone",
      "cpf",
      "cep",
      "street",
      "number",
      "complement",
      "neighborhood",
      "city",
      "state",
      "company",
    ] as const;
    const body: Record<string, unknown> = Object.fromEntries(
      fields.map((field) => [field, form.get(field)]),
    );
    body.acceptTerms = form.get("terms") === "on";
    try {
      const data = await marketRequest("auth", body, "PATCH");
      setUser(data.user);
      setProfile(data.profile);
      setMessage(
        data.user.phoneVerified
          ? "Cadastro atualizado."
          : "Dados salvos. Agora confirme seu celular por SMS.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível salvar.");
    } finally {
      setBusy(false);
    }
  }

  async function phoneAction(action: "send" | "verify", code?: string) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const data = await marketRequest("auth/phone", { action, code });
      setMessage(data.message);
      if (data.verified) {
        const refreshed = await marketRequest("auth");
        setUser(refreshed.user);
        setProfile(refreshed.profile);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível confirmar o celular.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (!user) return null;
  if (!loaded)
    return (
      <p role="status" className="text-sm text-zinc-400">
        Carregando seus dados...
      </p>
    );
  const field = (
    name: string,
    label: string,
    value: string,
    options: {
      required?: boolean;
      maxLength?: number;
      autoComplete?: string;
      inputMode?: "numeric";
      placeholder?: string;
    } = {},
  ) => (
    <label className="block text-sm">
      {label}
      <input
        name={name}
        defaultValue={value}
        required={options.required}
        maxLength={options.maxLength}
        autoComplete={options.autoComplete}
        inputMode={options.inputMode}
        placeholder={options.placeholder}
        className="market-input mt-2"
      />
    </label>
  );

  return (
    <div className="space-y-5">
      {error && (
        <p role="alert" className="market-error">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="market-success">
          {message}
        </p>
      )}
      <form onSubmit={save} className="market-panel max-w-2xl space-y-5 p-6">
        <h2 className="text-xl font-semibold">
          Cadastro para compras e vendas
        </h2>
        <p className="text-xs leading-5 text-zinc-400">
          O Google protege seu acesso. Os dados abaixo são solicitados pela
          ConderTech para atendimento, emissão fiscal e entrega.
        </p>
        {field("name", "Nome completo", profile?.name || user.name, {
          required: true,
          maxLength: 100,
          autoComplete: "name",
        })}
        <label className="block text-sm">
          E-mail Google
          <input
            value={user.email}
            readOnly
            className="market-input mt-2 opacity-60"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          {field("phone", "Celular com DDD", profile?.phone || user.phone, {
            required: true,
            maxLength: 20,
            autoComplete: "tel",
            inputMode: "numeric",
            placeholder: "11999999999",
          })}
          {field("cpf", "CPF", profile?.cpf || "", {
            required: true,
            maxLength: 14,
            inputMode: "numeric",
            placeholder: "000.000.000-00",
          })}
          {field("cep", "CEP", profile?.cep || "", {
            required: true,
            maxLength: 9,
            autoComplete: "postal-code",
            inputMode: "numeric",
            placeholder: "00000-000",
          })}
          {field("state", "Estado (UF)", profile?.state || "", {
            required: true,
            maxLength: 2,
            autoComplete: "address-level1",
            placeholder: "SC",
          })}
          <div className="sm:col-span-2">
            {field("street", "Rua / avenida", profile?.street || "", {
              required: true,
              maxLength: 160,
              autoComplete: "street-address",
            })}
          </div>
          {field("number", "Número", profile?.number || "", {
            required: true,
            maxLength: 20,
          })}
          {field("complement", "Complemento", profile?.complement || "", {
            maxLength: 100,
          })}
          {field("neighborhood", "Bairro", profile?.neighborhood || "", {
            required: true,
            maxLength: 100,
            autoComplete: "address-level3",
          })}
          {field("city", "Cidade", profile?.city || "", {
            required: true,
            maxLength: 100,
            autoComplete: "address-level2",
          })}
          <div className="sm:col-span-2">
            {field(
              "company",
              "Empresa (opcional)",
              profile?.company || user.company,
              { maxLength: 160, autoComplete: "organization" },
            )}
          </div>
        </div>
        <label className="flex items-start gap-3 text-xs leading-5 text-zinc-400">
          <input
            type="checkbox"
            name="terms"
            required
            defaultChecked={Boolean(profile?.terms_accepted_at)}
            className="mt-1 accent-red-500"
          />
          <span>
            Li e aceito os{" "}
            <Link
              href="/termos-de-uso"
              target="_blank"
              className="text-zinc-200 underline"
            >
              termos de uso
            </Link>{" "}
            e a{" "}
            <Link
              href="/governanca-de-dados"
              target="_blank"
              className="text-zinc-200 underline"
            >
              política de dados
            </Link>
            .
          </span>
        </label>
        <button disabled={busy} className="market-primary">
          {busy ? "Salvando..." : "Salvar cadastro"}
        </button>
      </form>

      {profile?.terms_accepted_at && (
        <section className="market-panel max-w-2xl space-y-4 p-6">
          <h3 className="font-semibold">Confirmação do celular</h3>
          <p className="text-sm text-zinc-400">
            {user.phoneVerified
              ? "Celular confirmado. Compras e vendas liberadas."
              : "Confirme que este celular é seu. O Google continuará sendo seu único método de login."}
          </p>
          {!user.phoneVerified && (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => void phoneAction("send")}
                className="market-secondary"
              >
                {busy ? "Aguarde..." : "Enviar código por SMS"}
              </button>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  void phoneAction("verify", String(form.get("code") || ""));
                }}
                className="flex flex-wrap gap-3"
              >
                <input
                  name="code"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="Código de 6 dígitos"
                  className="market-input min-w-0 flex-1"
                />
                <button disabled={busy} className="market-primary">
                  Confirmar código
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
}
