import {
    Flex,
    useMediaQuery,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    useDisclosure,
    useToast,
    Select,
  } from "@chakra-ui/react";
  import { useMemo, useState, useRef, useEffect } from "react";
  import axios from "axios";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import {
    Button,
    Input,
  } from "antd";

import { toast } from 'sonner';
import baseUrl from "../../../assets/utils/baseUrl";
import { UploadOutlined } from "@ant-design/icons";


const CreateProduct = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toasts = useToast();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [img64, setImg64] = useState("");
    const [updt, setUpdt] = useState(false);

    let userId ="";
   if (localStorage.getItem("usersInfos")) {
       userId = JSON.parse(localStorage.getItem("usersInfos"))._id;
   }


  const queryClient = useQueryClient();
  const inputImageRef = useRef(null);

  useEffect(()=>{
  console.log("updt");
  },[updt])


  const CreateProducts = (productInfos) => {
    axios
      .post(baseUrl + "product" + "/create", productInfos,{withCredentials: true})
      .then((res) => {
        toast.success("task created successfully!!");
        setUpdt(!updt);
        return res.data;
      })
      .catch((err)=>{
        console.log(err);
        toast.error(err?.response?.data?.message || "error");
      });
  };

  const {
    mutate: CreateProductsMutation,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: CreateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries(["datathisOrg2"]);
    },
  });
  
  
    const handleCreateTask = () => {
      if (!productName || !productDescription) {
        toast.error("please fields required !!"); 
        console.log("Error");
        return;
      }
  
      CreateProductsMutation({
        title : productName, 
        summary : productDescription,
        price : price,
        address : location,
        certified : "true",
        category : category,
        image : img64,
        // seller: userId
        })

         console.log({
          title : productName, 
          summary : productDescription,
          price : price,
          address : location,
          certified : "true",
          category : category,
          image : img64,
          // seller: userId
          })
  
      setProductName("");
      setProductDescription("");
      onClose();
    };


    
 const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

  
  const updateImageProfile = async(ev) => {
   const img = ev.target.files[0]
    const imgB64 = await convertToBase64(img);
    setImg64(imgB64);
  };

  const uploadFile =  () => {
    if (inputImageRef.current) {
        inputImageRef.current.click();
    }
  };
  
    return (
      <>
        <span onClick={onOpen} className=" cursor-pointer p-1 px-2 border-[1px] border-gray-300 text-[#737373]">add product +</span>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>ADD NEW PRODUCTS</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormLabel>image</FormLabel>
            <input
        ref={inputImageRef}
        type="file"
        accept="image/*"
        onChange={(e) => updateImageProfile(e)}
        className=""
        name="image"
        id="profile_input"
        style={{display:"none"}}
      />
      <Button onClick={uploadFile} icon={<UploadOutlined />}>
        Click to Upload
      </Button>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter task name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Enter task description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter task description"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  placeholder="Enter task description"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Categories</FormLabel> 
                <Select width={150} onChange={(e) => setCategory(e.target.value)}>
                   <option value="legumes">legumes</option>
                   <option value='fruits'>fruits</option>
                   <option value='oleagineux'>oleagineux</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                bg="#5a54e6"
                color="white"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>&nbsp;&nbsp;
              <Button
                colorScheme="blue"
                bg="#5a54e6"
                color="white"
                onClick={handleCreateTask}
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CreateProduct;