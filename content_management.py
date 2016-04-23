def data():
	f = open('text.txt', 'r')
	data = f.read()
	#print(data)
	f.close()
	return data