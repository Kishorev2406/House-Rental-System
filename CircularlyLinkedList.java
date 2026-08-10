]public first;
class DLL{
    Node head;
    class Node{
        int data;
        Node prev;
        Node next;
        Node(int data){
            this.data = data;
            this.prev = null;
            this.next = null;
        }
        
}
public void insertAtB(int data){
    Node newNode = new Node(data);
    if(head == null){
        head = newNode;
        return;
    }
    Node temp = head;
    while(temp.next != null){
        temp = temp.next;
    }
    temp.next = newNode;
    newNode.prev = temp;
}
public void insertAtF(int data){
    Node newNode = new Node(data);
    if(head == null){
        head = newNode;
        return;
    }
    newNode.next = head;
    head.prev = newNode;
    head = newNode;
}
public void insertAtP(int data, int pos){
    Node newNode = new Node(data);
    if(pos == 1){
        insertAtF(data);
        return;
    }
    Node temp = head;
    for(int i = 1; i < pos-1; i++){
        temp = temp.next;
    }
    newNode.next = temp.next;
    if(temp.next != null){
        temp.next.prev = newNode;
    }
    temp.next = newNode;
    newNode.prev = temp;
}
public void deleteAtB(){
    if(head == null){
        return;
    }
    if(head.next == null){
        head = null;
        return;
    }
    Node temp = head;
    while(temp.next != null){
        temp = temp.next;
    }
    temp.prev.next = null;
}
public void deleteAtF(){
    if(head == null){
        return;
    }
    if(head.next == null){
        head = null;
        return;
    }
    head = head.next;
    head.prev = null;
}
public void deleteAtP(int pos){
    if(head == null){
        return;
    }
    if(pos == 1){
        deleteAtF();
        return;
    }
    Node temp = head;
    for(int i = 1; i < pos; i++){
        temp = temp.next;
    }
    if(temp.next != null){
        temp.next.prev = temp.prev;
    }
    if(temp.prev != null){
        temp.prev.next = temp.next;
    }
}
public void display(){
    Node temp = head;
    while(temp != null){
        System.out.print(temp.data + " ");
        temp = temp.next;
    }
    System.out.println();
}
public static void main(String[] args) {
    DLL dll = new DLL();
    dll.insertAtB(10);
    dll.insertAtB(20);
    dll.insertAtF(5);
    dll.insertAtP(15, 2);
    dll.display(); // Output: 5 15 10 20
    dll.deleteAtB();
    dll.display(); // Output: 5 15 10
    dll.deleteAtF();
    dll.display(); // Output: 15 10
    dll.deleteAtP(2);
    dll.display(); // Output: 15
}
}