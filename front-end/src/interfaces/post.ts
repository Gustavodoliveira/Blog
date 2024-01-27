export interface IPost {
	image: file[],
	Title: string,
	Content: string,
	Author: string,
	Categoric: string
	IdAuthor: string
}
 interface file {
	filename: string
}