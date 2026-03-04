import { z } from "zod";
import { articleSchema } from "./article.validation";

export const importArticlesSchema = z.array(articleSchema);
