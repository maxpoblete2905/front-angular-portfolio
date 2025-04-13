import { View } from './view.interface';
import { Timestamp } from '@angular/fire/firestore'; // o 'firebase/firestore'

export interface Project {
  state: boolean;
  creationDate: Timestamp;
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  companyName: string;
  position: string;
  client: string;
  technologies: string[];
  views: View[];
  completedProfile: boolean
}
