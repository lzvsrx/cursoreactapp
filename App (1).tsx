import type { Car } from '../types/car';

export const API_URL = 'https://digitalinnovationone.github.io/fake-data-api-lamborghini/api/lamborghini.json';
const ASSETS_URL = 'https://digitalinnovationone.github.io/fake-data-api-lamborghini/assets';

type ApiRecord = Record<string, unknown>;

function normalizeCar(value: unknown, index: number): Car | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as ApiRecord;
  const id = Number(raw.id ?? index + 1);
  const name = raw.carName ?? raw.name ?? raw.model;
  if (!name || !Number.isFinite(id)) return null;
  const originalImage = raw.image ?? raw.imageUrl ?? raw.img;
  const image = typeof originalImage === 'string' && originalImage.length
    ? (originalImage.startsWith('http') ? originalImage : `${ASSETS_URL}/${originalImage.replace(/^\//, '')}`)
    : `${ASSETS_URL}/${id}.png`;
  return {
    id,
    carName: String(name),
    releaseYear: String(raw.releaseYear ?? raw.year ?? 'Não informado'),
    price: String(raw.price ?? 'Sob consulta'),
    image,
  };
}

export async function getCars(signal?: AbortSignal): Promise<Car[]> {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) throw new Error(`Falha na API (HTTP ${response.status}).`);
  const json: unknown = await response.json();
  const payload = json && typeof json === 'object' && !Array.isArray(json)
    ? (json as ApiRecord).cars ?? (json as ApiRecord).data ?? json
    : json;
  if (!Array.isArray(payload)) throw new Error('Formato de dados inesperado na API.');
  const cars = payload.map(normalizeCar).filter((car): car is Car => car !== null);
  if (!cars.length) throw new Error('Nenhum carro disponível no momento.');
  return cars;
}
