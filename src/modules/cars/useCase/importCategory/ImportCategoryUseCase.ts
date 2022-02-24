import { parse as csvParse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => reject(err));
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.map((category) => {
      const { name } = category;

      const categoryExists = this.categoryRepository.findByName(name);

      if (!categoryExists) {
        return this.categoryRepository.create(category);
      }

      return null;
    });
  }
}

export { ImportCategoryUseCase };
