from pdf2image import convert_from_path
import numpy as np
import os
import cv2



def process( image_path ):
    image = cv2.imread( image_path)

    ## De skewing 
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.bitwise_not(gray)
    thresh = cv2.threshold(gray, 0, 255,
                           cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    coords = np.column_stack(np.where(thresh > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
	    angle = -(90 + angle)
    else:
        angle = -angle
    
    (h, w) = image.shape[:2]


    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h),
                         flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

    print("[INFO] Image : {} angle rotated: {:.3f}".format( image_path, angle))

    


    cv2.imwrite(image_path , rotated)
    # image = cv2.imread(image_path , cv2.IMREAD_GRAYSCALE )
    
    

    # image = cv2.adaptiveThreshold( image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY, 3, 2)

    # cv2.imwrite( image_path , image)                                  










def main(args):
    # print(args.pdf_path)
    
    images = convert_from_path( args.pdf_path , dpi=300 , fmt='tiff' )
    
    out = '/'.join(args.pdf_path.split('/')[:-1])+'/images'
    
    os.makedirs(out , exist_ok=True)

    print('Outputting processed images in directory "images" ')
    for i , image in enumerate(images):
        img_path = out+'/imgi-' + str(i) +'.tiff'
        image.save( img_path) 
        process(img_path)




import argparse

parser = argparse.ArgumentParser(description='PDF PATH')
parser.add_argument('--pdf_path', '-p',  metavar='PDF PATH', type=str,
                    help='enter the path to pdf file' , required=True)

args = parser.parse_args()

main(args)


