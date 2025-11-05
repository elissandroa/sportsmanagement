// Utilitários para geração de PDFs com a logo do Hope Internacional FC

export const HOPE_LOGO_URL = 'https://img.sofascore.com/api/v1/team/506795/image';
export const HOPE_PRIMARY_COLOR = '#0066cc';

// Cache da logo em Base64 para reutilização
let cachedLogoBase64: string | null = null;

/**
 * Converte a logo do Hope para Base64 usando um proxy CORS
 */
const loadHopeLogo = async (): Promise<string | null> => {
  // Se já temos em cache, retornar
  if (cachedLogoBase64) {
    return cachedLogoBase64;
  }

  try {
    // Criar uma imagem temporária
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Tentar usar a URL diretamente primeiro
    const imageUrl = HOPE_LOGO_URL;
    
    return new Promise((resolve) => {
      img.onload = () => {
        try {
          // Criar canvas para converter a imagem
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(null);
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          
          // Converter para Base64
          const base64 = canvas.toDataURL('image/png');
          cachedLogoBase64 = base64;
          resolve(base64);
        } catch (e) {
          console.warn('Erro ao converter logo:', e);
          resolve(null);
        }
      };
      
      img.onerror = () => {
        console.warn('Erro ao carregar logo do Hope - usando fallback');
        resolve(null);
      };
      
      // Timeout de 3 segundos
      setTimeout(() => {
        resolve(null);
      }, 3000);
      
      img.src = imageUrl;
    });
  } catch (e) {
    console.warn('Erro geral ao carregar logo:', e);
    return null;
  }
};

/**
 * Adiciona cabeçalho com a logo do Hope Internacional FC ao PDF
 * Tenta carregar a logo real, se falhar usa um fallback visual
 */
export const addHopeHeader = async (
  doc: any,
  pageWidth: number,
  title?: string,
  logoBase64?: string | null
): Promise<number> => {
  // Cabeçalho colorido
  doc.setFillColor(0, 102, 204);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Adicionar logo do Hope
  try {
    if (logoBase64) {
      // Usar logo real em Base64
      doc.addImage(logoBase64, 'PNG', 15, 8, 20, 20);
    } else {
      // Fallback: Círculo branco com texto "HOPE"
      doc.setFillColor(255, 255, 255);
      doc.circle(25, 17.5, 8, 'F');
      
      doc.setTextColor(0, 102, 204);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('HOPE', 18, 19);
    }
  } catch (e) {
    console.warn('Logo não adicionada:', e);
    // Se falhar, adicionar círculo simples
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 17.5, 8, 'F');
  }

  // Título do clube
  doc.setTextColor('#ffffff');
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HOPE INTERNACIONAL FC', pageWidth / 2, 22, { align: 'center' });

  let yPosition = 45;

  // Título do documento (se fornecido)
  if (title) {
    doc.setTextColor('#000000');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    // Linha separadora
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;
  }

  return yPosition;
};

/**
 * Versão síncrona do cabeçalho (para manter compatibilidade)
 */
export const addHopeHeaderSync = (
  doc: any,
  pageWidth: number,
  title?: string,
  logoBase64?: string | null
): number => {
  // Cabeçalho colorido
  doc.setFillColor(0, 102, 204);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Adicionar logo do Hope
  try {
    if (logoBase64) {
      // Usar logo real em Base64
      doc.addImage(logoBase64, 'PNG', 15, 8, 20, 20);
    } else {
      // Fallback: Círculo branco com texto "HOPE"
      doc.setFillColor(255, 255, 255);
      doc.circle(25, 17.5, 8, 'F');
      
      doc.setTextColor(0, 102, 204);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('HOPE', 18, 19);
    }
  } catch (e) {
    console.warn('Logo não adicionada:', e);
    // Se falhar, adicionar círculo simples
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 17.5, 8, 'F');
  }

  // Título do clube
  doc.setTextColor('#ffffff');
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HOPE INTERNACIONAL FC', pageWidth / 2, 22, { align: 'center' });

  let yPosition = 45;

  // Título do documento (se fornecido)
  if (title) {
    doc.setTextColor('#000000');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    // Linha separadora
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;
  }

  return yPosition;
};

/**
 * Adiciona rodapé padrão do Hope Internacional FC ao PDF
 */
export const addHopeFooter = (
  doc: any,
  pageWidth: number,
  pageHeight: number,
  customText?: string
) => {
  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor('#666666');
    
    // Número da página e data
    doc.text(
      `Página ${i} de ${totalPages} - Gerado em ${new Date().toLocaleString('pt-BR')}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    
    // Nome do clube ou texto customizado
    const footerText = customText || 'Hope Internacional Football Club - Sistema de Gestão Esportiva';
    doc.text(
      footerText,
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center' }
    );
  }
};

/**
 * Cria seção com título colorido
 */
export const addSectionTitle = (
  doc: any,
  title: string,
  yPosition: number,
  margin: number = 20,
  color: string = HOPE_PRIMARY_COLOR
): number => {
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(color);
  doc.text(title, margin, yPosition);
  return yPosition + 8;
};

/**
 * Adiciona texto simples
 */
export const addTextLine = (
  doc: any,
  text: string,
  yPosition: number,
  margin: number = 20,
  fontSize: number = 10,
  isBold: boolean = false,
  color: string = '#000000'
): number => {
  doc.setFontSize(fontSize);
  doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  doc.setTextColor(color);
  doc.text(text, margin, yPosition);
  return yPosition + (fontSize / 2) + 2;
};

/**
 * Verifica se é necessário adicionar nova página
 */
export const checkPageBreak = (
  doc: any,
  yPosition: number,
  requiredSpace: number,
  pageHeight: number,
  margin: number = 20
): { newY: number; pageAdded: boolean } => {
  if (yPosition + requiredSpace > pageHeight - margin) {
    doc.addPage();
    return { newY: margin, pageAdded: true };
  }
  return { newY: yPosition, pageAdded: false };
};

/**
 * Função auxiliar para carregar a logo antes de gerar o PDF
 * Usa esta função antes de chamar as funções de geração de PDF
 */
export const preloadHopeLogo = loadHopeLogo;
