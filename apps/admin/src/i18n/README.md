# Sistema de Internacionalización (i18n)

Este proyecto utiliza `react-i18next` para manejar las traducciones en español e inglés.

## Estructura

```
src/i18n/
├── index.ts              # Configuración principal de i18n
├── hooks/
│   └── useTranslation.ts # Hook personalizado para traducciones
├── locales/
│   ├── es.json          # Traducciones en español
│   └── en.json          # Traducciones en inglés
└── README.md            # Esta documentación
```

## Uso Básico

### 1. Importar el hook de traducción

```tsx
import { useTranslation } from '../i18n/hooks/useTranslation';

const MyComponent = () => {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('validation.required')}</p>
    </div>
  );
};
```

### 2. Cambiar idioma

```tsx
const { changeLanguage } = useTranslation();

// Cambiar a inglés
changeLanguage('en');

// Cambiar a español
changeLanguage('es');
```

### 3. Interpolación de variables

```tsx
// En el archivo de traducciones
{
  "validation": {
    "minLength": "Mínimo {{min}} caracteres"
  }
}

// En el componente
const { t } = useTranslation();
const message = t('validation.minLength', { min: 8 });
```

## Estructura de Traducciones

Las traducciones están organizadas en secciones:

- **common**: Textos comunes (botones, estados, etc.)
- **auth**: Autenticación y login
- **validation**: Mensajes de validación
- **navigation**: Navegación y menús
- **dashboard**: Panel de control
- **categories**: Gestión de categorías
- **items**: Gestión de artículos
- **providers**: Gestión de proveedores
- **reports**: Reportes
- **table**: Componentes de tabla
- **form**: Componentes de formulario

## Componente LanguageSwitcher

Se incluye un componente para cambiar el idioma:

```tsx
import { LanguageSwitcher } from '../components/language-switcher';

// En tu header o navbar
<LanguageSwitcher />
```

## Configuración

El sistema está configurado para:

- Detectar automáticamente el idioma del navegador
- Guardar la preferencia en localStorage
- Usar español como idioma por defecto
- Mostrar debug en modo desarrollo

## Agregar Nuevas Traducciones

1. Agregar las traducciones en `locales/es.json` y `locales/en.json`
2. Usar el hook `useTranslation` en tu componente
3. Referenciar las traducciones usando `t('seccion.clave')`

## Ejemplo Completo

```tsx
import { FC } from 'react';
import { Button, Input } from 'antd';
import { useTranslation } from '../i18n/hooks/useTranslation';

const MyForm: FC = () => {
  const { t } = useTranslation();

  return (
    <form>
      <Input 
        placeholder={t('form.searchPlaceholder')}
        label={t('auth.email')}
      />
      <Button type="primary">
        {t('common.save')}
      </Button>
    </form>
  );
};
``` 