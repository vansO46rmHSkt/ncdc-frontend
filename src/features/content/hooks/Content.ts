const contentIdBrand = Symbol();
type ContentId = number & { [contentIdBrand]: unknown };

export interface Content {
  id: ContentId;
  title: string | null;
  body: string | null;
  createdAt: string;
  updatedAt: string;
}
