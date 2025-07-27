import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ScriptService } from './script.service';

async function runScript() {
  const [scriptName] = process.argv.slice(2);

  if (!scriptName) {
    console.error('Uso: pnpm nx script backend <nombre-script>');
    console.error('Scripts disponibles: init-data');
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const scriptService = app.get(ScriptService);

  try {
    switch (scriptName) {
      case 'init-data':
        await scriptService.initData();
        break;
      default:
        console.error(`Script "${scriptName}" no encontrado`);
    }
  } catch (error) {
    console.error('Error ejecutando script:', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

runScript();
