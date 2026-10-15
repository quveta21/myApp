
// obiectul returnat de server
export interface ItemProps {
    id?: string; // un item nou, nesalvat poate sa nu aiba ID inca
    text: string;
    date?: Date;
    version?: number;
}