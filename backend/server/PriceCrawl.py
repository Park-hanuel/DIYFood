import time
import csv
import json
from dotenv import load_dotenv;
import pandas as pd
import numpy as np

from sqlalchemy import create_engine
import pymysql
import pandas as pd
pymysql.install_as_MySQLdb()
import MySQLdb

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By




def get_driver(url):
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')
    options.add_argument("--no-sandbox")
    ser = Service("./chromedriver.exe")
    driver = webdriver.Chrome(service=ser, options=options)
    driver.get(url)
    return driver


def run(url):
    driver = get_driver(url)
    # driver.implicitly_wait(3)
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("안심")
    time.sleep(1)
    

    driver.find_element("id", "ipt_search").click()
    time.sleep(3)


    text1 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text1)
    
    text01 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[7]/div/table/tbody/tr[4]/td[6]').text
    print(text01)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("등심")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text2 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text2)
    
    text02 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[7]/div/table/tbody/tr[4]/td[6]').text
    print(text02)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("설도")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text3 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text3)
    
    text03 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[7]/div/table/tbody/tr[4]/td[6]').text
    print(text03)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("양지")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text4 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text4)
    
    text04 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[7]/div/table/tbody/tr[4]/td[6]').text
    print(text04)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("갈비")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text5 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text5)
    
    text05 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[7]/div/table/tbody/tr[4]/td[6]').text
    print(text05)
    

    ################
    select = Select(driver.find_element("id", "searchCondition1"))
    select.select_by_visible_text("돼지")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("삼겹살")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text6 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text6)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("목심")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text7 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text7)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("갈비")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text8 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text8)

    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("앞다리")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text9 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text9)
    
    ##############
    select = Select(driver.find_element("id", "searchCondition1"))
    select.select_by_visible_text("닭")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("육계(kg)")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text10 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text10)
    
    #####################
    select = Select(driver.find_element("id", "searchCondition1"))
    select.select_by_visible_text("계란")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    text11 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text11)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("특란10구")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text12 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text12)
    
    ################
    select = Select(driver.find_element("id", "searchCondition1"))
    select.select_by_visible_text("수입 소고기")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    text13 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text13)
    
    #
    select = Select(driver.find_element("id", "searchCondition2"))
    select.select_by_visible_text("갈비살 (냉장)")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    
    text14 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text14)
    
    #################
    select = Select(driver.find_element("id", "searchCondition1"))
    select.select_by_visible_text("수입 돼지고기")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    text15 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text15)
    
    #################
    select = Select(driver.find_element("id", "searchCondition1"))
    select.select_by_visible_text("우유")
    driver.find_element("id", "ipt_search").click()
    time.sleep(3)
    text16 = driver.find_element(by=By.XPATH, value='//*[@id="searchForm"]/div/div[4]/div/table/tbody/tr[4]/td[6]').text
    print(text16)
    
    priceData = [text1, text01, text2, text02, text3, text03, text4, text04, text5, text05, text6, text7, text8, text9, text10, text11, text12, text13, text14, text15, text16]
    
    # json_string = json.dumps(priceData)
    # print(json_string)
    
    with open('priceData.json', 'w', encoding="utf-8") as make_file:
        json.dump(priceData, make_file)
        
        
    priceData2 = ['127',' 501',' 0',' 갈비','1+등급',' 상품 ',' 100g',text1,
'128',' 501',' 1',' 갈비','1등급',' 상품 ',' 100g',text01,
'129',' 502',' 0',' 등심','1+등급',' 상품 ',' 100g',text2,
'130',' 502',' 1',' 등심','1등급',' 상품 ',' 100g',text02,
'127',' 503',' 0',' 양지','1+등급',' 상품 ',' 100g', text3,
'127',' 503',' 1',' 양지','1등급',' 상품 ',' 100g', text03,
'127',' 504',' 0',' 안심','1+등급',' 상품 ',' 100g', text4,
'127',' 504',' 1',' 안심','1등급',' 상품 ',' 100g', text04,
'127',' 505',' 0',' 설도','1+등급',' 상품 ',' 100g', text5,
'127',' 505',' 1',' 설도','1등급',' 상품 ',' 100g', text05,
'127',' 515',' 0',' 삼겹살','삼겹살',' 상품 ',' 100g', text6,
'127',' 517',' 0',' 목살','목심',' 상품 ',' 100g', text7,
'127',' 518',' 0',' 돼지갈비','갈비',' 상품 ',' 100g', text8,
'127',' 519',' 0',' 돼지앞다리살','앞다리',' 상품 ',' 100g', text9,
'127',' 520',' 0',' 닭고기','육계',' 상품 ',' 1kg', text10,
'127',' 521',' 0',' 계란','특란30구',' 상품 ',' 30구', text11,
'127',' 521',' 0',' 계란','특란10구',' 상품 ',' 10구', text12,
'127',' 507',' 0',' 갈비','갈비(냉동)',' 상품 ',' 100g', text13,
'127',' 508',' 0',' 갈비살','갈비살(냉장)',' 상품 ',' 100g', text14,
'127',' 515',' 1',' 삼겹살','삼겹살(냉동)',' 상품 ',' 100g', text15,
'127',' 522',' 0',' 우유','흰우유',' 상품 ',' 1L', text16,
]
    priceData3 = priceData2
    # json_string = json.dumps(priceData)
    # print(json_string)
    
    # with open('priceData.json', 'w', encoding="utf-8") as make_file:
    #     json.dump(priceData2,make_file, ensure_ascii=False)
        
    # sql = """INSERT INTO User (bicycle_index, time_start, stop_index1, stop_1, count_stop1, time_end, stop_index2, stop_2, count_stop2, cycle, distance) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    
    # cur = conn_aws.cursor(buffered=True)
    # cur.executemany(sql, data)
    # conn_aws.commit()   
    
    # df = pd.DataFrame(priceData2)
    # df = pd.DataFrame([sub.split(',') for sub in 1])
    # print(df)
    
    engine = create_engine("mysql+pymysql://admin:"+"Kskim0319!"+"@diy-food.c04sxzppt9dy.us-west-1.rds.amazonaws.com:3306/diyfood", encoding='utf-8')
    
    conn = engine.connect()
    priceData3 = priceData2
    PriceData3 = np.array(priceData3).reshape(21,8)
    df = pd.DataFrame(PriceData3, columns = ['id','itemCode', 'detailItemCode','itemName','detailItemName','rank','unit','price'])
    livestock = df.loc[:,['itemCode', 'detailItemCode','itemName','detailItemName','rank','unit','price']]
    table_name = "LiveIngredients"
    livestock.to_sql(name=table_name,
            con=engine,
            if_exists="append",
            index=False
            )
    
    
if __name__ == "__main__":
    run("https://www.ekapepia.com/priceComparison/poducerPrice/retail/prdlstPrice.do")
