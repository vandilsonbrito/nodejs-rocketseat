-- Atualiza valores inválidos (opcional, se houver dados problemáticos)
UPDATE "gyms"
SET latitude = NULL
WHERE latitude !~ '^-?[0-9]+\\.?[0-9]*$'
   OR latitude IS NOT NULL AND TRIM(latitude) = '';

UPDATE "gyms"
SET longitude = NULL
WHERE longitude !~ '^-?[0-9]+\\.?[0-9]*$'
   OR longitude IS NOT NULL AND TRIM(longitude) = '';

-- Altera o tipo das colunas com conversão explícita
ALTER TABLE "gyms"
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(10,6) USING (latitude::DECIMAL(10,6)),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(10,6) USING (longitude::DECIMAL(10,6));