export type Language = 'en' | 'bn';

export interface PolicySection {
  id: number;
  slug: string;
  titleEn: string;
  titleBn: string;
  iconName: string;
  contentEn: string[];
  contentBn: string[];
  highlightsEn?: string[];
  highlightsBn?: string[];
}

export interface AppFeature {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  icon: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
