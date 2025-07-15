"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  // BackIcon,
  HeadIcon,
} from "./icons";

// Create styles like React Native StyleSheet
const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  headRow: {
    flexDirection: "row",
  },
  backHeadOne: {
    backgroundColor: "#1D2939",
    height: "10px",
    width: "50%",
  },
  backHeadTwo: {
    backgroundColor: "#FF7239",
    height: "10px",
    width: "50%",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    // backgroundColor: "#F8F8F8",
    marginBottom: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C0C0C",
  },
  invoiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  headLabelP: {
    color: "#0C0C0C",
    fontSize: 9,
    fontWeight: 400,
  },
  RightLogoText: {
    color: "#0C0C0C",
    fontSize: 12,
    fontWeight: 700,
  },
  invoiceRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoRight: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  addressHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  leftContact: {
    flexDirection: "row",
    gap: "10px",
  },
  leftContentMain: {
    flexDirection: "column",
    gap: 2,
  },
  /*section Two*/
  sectionTwo: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
  },
  midBranchDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftDiv: {
    flexDirection: "column",
    gap: "8px",
    width: "213px",
  },
  leftDivText: {
    color: "#0C0C0C",
    fontWeight: 600,
  },
  rightDiv: {
    flexDirection: "column",
    gap: "8px",
    width: "188px ",
  },
  branchAndTaxHead: {
    color: "#0C0C0C",
    fontSize: 10,
    fontWeight: 500,
  },
  table: {
    width: "100%",
    border: "0.5pt solid #acacac",
    borderBottom: "0px",
    marginTop: 24,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #acacac",
    minHeight: 25,
  },
  tableHeader: {},
  tableCell: {
    flexDirection: "row",
    padding: 5,
    borderRight: "0.5pt solid #acacac",
  },
  tableCellLast: {
    flex: 1,
    padding: 5,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
  },
  headerText: {
    fontWeight: 700,
    color: "#0C0C0C",
    fontSize: 8,
  },
  cellText: {
    fontSize: 10,
    alignItems: "center",
  },
  // Define column widths
  colSlNo: {
    width: "32px",
  },
  colDescription: {
    width: "261px",
    flexDirection: "column",
    gap: "4px",
  },
  colQuantity: {
    width: "60px",
    justifyContent: "center",
  },
  colUnitPrice: {
    width: "66px",
    justifyContent: "center",
  },
  colDiscount: {
    width: "62px",
    justifyContent: "center",
  },
  colTotal: {
    width: "66px",
    alignItems: "center",
  },
});

// Your data type
type InvoiceData = {
  companyName: string;
  address: string;
  number: string;
  site: string;
  support: string;
  date: string;
  totalAmount: number;
};

interface Data {
  id: number;
  description: {
    name: string;
    warranty: string;
    sn?: string; // sn can be optional based on sample data
  };
  quantity: string;
  unit_price: string;
  discount: string;
  total: string;
}

type ChunkedPage = {
  data: Data[];
  startIndex: number;
};

export default function InvoiceDocumentTwo({ data }: { data: InvoiceData }) {
  const chunkArray = (
    array: Data[],
    firstPageLimit: number,
    otherPagesLimit: number,
    lastPageItemCount: number
  ): ChunkedPage[] => {
    const result: ChunkedPage[] = [];
    let currentIndex = 0;

    // First page
    if (array.length > 0) {
      result.push({
        data: array.slice(currentIndex, currentIndex + firstPageLimit),
        startIndex: currentIndex,
      });
      currentIndex += firstPageLimit;
    }

    const remainingItems = array.length - currentIndex;

    if (remainingItems <= 0) {
      return result;
    }

    // If remaining items are exactly or less than lastPageItemCount, put them all on the last page
    if (remainingItems <= lastPageItemCount) {
      result.push({
        data: array.slice(currentIndex, array.length),
        startIndex: currentIndex,
      });
      return result;
    }

    // If there are more items than just for the last page, distribute them
    let itemsForIntermediatePages = remainingItems - lastPageItemCount;

    while (itemsForIntermediatePages > 0) {
      const itemsToTake = Math.min(itemsForIntermediatePages, otherPagesLimit);
      result.push({
        data: array.slice(currentIndex, currentIndex + itemsToTake),
        startIndex: currentIndex,
      });
      currentIndex += itemsToTake;
      itemsForIntermediatePages -= itemsToTake;
    }

    // Add the last page with lastPageItemCount items
    if (currentIndex < array.length) {
      result.push({
        data: array.slice(currentIndex, currentIndex + lastPageItemCount),
        startIndex: currentIndex,
      });
    }

    return result;
  };

  // Sample data (35 items for demonstration)
  const dataSe = [
    {
      id: 1,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
        sn: "QT45295754",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 2,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
        sn: "QT45295754",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 3,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
        sn: "QT45295754",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 4,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 5,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 6,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 7,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 8,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 9,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 10,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 11,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 12,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 13,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 14,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 15,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 16,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 17,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 18,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 19,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 20,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 21,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 22,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 23,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 24,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 25,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 26,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 27,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 28,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 29,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 30,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 31,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 32,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 33,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 34,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
    {
      id: 35,
      description: {
        name: "power supply chaina Hi-power 500w",
        warranty: "365 days",
      },
      quantity: "20",
      unit_price: "50",
      discount: "40",
      total: "1054",
    },
  ];

  const firstPageLimit = 14;
  const otherPagesLimit = 17;
  const lastPageItemCount = 5; // Desired number of items on the last page

  const chunkedData = chunkArray(
    dataSe,
    firstPageLimit,
    otherPagesLimit,
    lastPageItemCount
  );

  return (
    <Document>
      {chunkedData.map((pageChunk, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === chunkedData.length - 1;
        return (
          <Page key={pageIndex} size="A4" style={styles.page}>
            {isFirstPage && (
              <View>
                <View style={styles.section}>
                  <View style={styles.invoiceRowHeader}>
                    <View style={styles.leftContentMain}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <HeadIcon />
                        <Text style={styles.header}>{data.companyName} </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {!isFirstPage && (
              <View style={styles.section}>
                <View style={styles.invoiceRowHeader}>
                  <View style={styles.leftContentMain}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <HeadIcon />
                      <Text style={styles.header}>{data.companyName} </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View
              style={[
                styles.sectionTwo,
                { backgroundColor: "#fff", zIndex: 1 },
              ]}
            >
              {/* <View style={{position:'absolute' , backgroundColor:'#fff', top:'20%', zIndex:-1, left:'45%', alignItems:'center',justifyContent:'center'}}>
          <BackIcon />
          </View> */}
              {isFirstPage && (
                <View
                  style={[styles.midBranchDiv, { backgroundColor: "#fff" }]}
                >
                  <View style={styles.leftDiv}>
                    <Text style={styles.branchAndTaxHead}>Dhaka Branch</Text>
                    <View style={{ flexDirection: "column", gap: "4px" }}>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Address:</Text>{" "}
                        Motijheel, Dhaka 1000
                      </Text>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Email:</Text>{" "}
                        Support@alzafpos.com
                      </Text>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Phone:</Text>{" "}
                        +8800138715416
                      </Text>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Web:</Text>{" "}
                        www.alzafpos.com
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rightDiv}>
                    <Text style={styles.branchAndTaxHead}>Text Invoice</Text>
                    <View style={{ flexDirection: "column", gap: "4px" }}>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Invoice No:</Text>{" "}
                        Motijheel, Dhaka 1000
                      </Text>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Chalan No:</Text>{" "}
                        Support@alzafpos.com
                      </Text>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Date:</Text>{" "}
                        +8800138715416
                      </Text>
                      <Text style={styles.headLabelP}>
                        <Text style={styles.leftDivText}>Zone:</Text>{" "}
                        www.alzafpos.com
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {/* table section  start*/}
              <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, styles.colSlNo]}>
                    <Text style={styles.headerText}>Sl No</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colDescription]}>
                    <Text style={styles.headerText}>Product Description</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colQuantity]}>
                    <Text style={styles.headerText}>Quantity</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colUnitPrice]}>
                    <Text style={styles.headerText}>Unit Price</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colDiscount]}>
                    <Text style={styles.headerText}>Discount</Text>
                  </View>
                  <View style={[styles.tableCellLast, styles.colTotal]}>
                    <Text style={styles.headerText}>Total</Text>
                  </View>
                </View>
                {/* Table Body */}
                {pageChunk.data.map((row, index) => {
                  const serialNo = pageChunk.startIndex + index + 1; // Corrected serial number calculation
                  return (
                    <View key={index} style={[styles.tableRow]}>
                      <View style={[styles.tableCell, styles.colSlNo]}>
                        <Text style={styles.cellText}>{serialNo}</Text>
                      </View>
                      <View style={[styles.tableCell, styles.colDescription]}>
                        {Object.entries(row.description ?? {}).map(
                          ([Key, value]) => (
                            <Text key={Key} style={styles.cellText}>
                              <Text
                                style={{ fontSize: "8px", fontWeight: "600" }}
                              >
                                {Key}:
                              </Text>
                              <Text style={{ fontSize: "8px" }}>
                                {" "}
                                {String(value)}
                              </Text>
                            </Text>
                          )
                        )}
                      </View>
                      <View style={[styles.tableCell, styles.colQuantity]}>
                        <Text style={[styles.cellText, { fontSize: "8px" }]}>
                          {row.quantity}
                        </Text>
                      </View>
                      <View style={[styles.tableCell, styles.colUnitPrice]}>
                        <Text style={[styles.cellText, { fontSize: "8px" }]}>
                          {row.unit_price}
                        </Text>
                      </View>
                      <View style={[styles.tableCell, styles.colDiscount]}>
                        <Text style={[styles.cellText, { fontSize: "8px" }]}>
                          {row.discount}
                        </Text>
                      </View>
                      <View style={[styles.tableCellLast, styles.colTotal]}>
                        <Text style={[styles.cellText, { fontSize: "8px" }]}>
                          {row.total}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              {/* amount calculation start */}
              {isLastPage && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "16px",
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: "8px", fontWeight: "400" }}>
                        <Text style={{ color: "#0C0C0C", fontWeight: "600" }}>
                          IN WORD:
                        </Text>{" "}
                        Twenty - Eight Thousand Seven Hundred Taka Only
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "column",
                          gap: "4px",
                          width: "200px",
                        }}
                      >
                        <View
                          style={[
                            styles.headLabelP,
                            {
                              borderBottom: "0.5pt solid #acacac",
                              paddingVertical: "4px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={{ fontWeight: "400", fontSize: "8px" }}>
                            Total Amount
                          </Text>{" "}
                          <Text>0.00</Text>
                        </View>
                        <View
                          style={[
                            styles.headLabelP,
                            {
                              borderBottom: "0.5pt solid #acacac",
                              paddingVertical: "4px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={{ fontWeight: "600", fontSize: "8px" }}>
                            Grand Total
                          </Text>{" "}
                          <Text>0.00</Text>
                        </View>
                        <View
                          style={[
                            styles.headLabelP,
                            {
                              borderBottom: "0.5pt solid #acacac",
                              paddingVertical: "4px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={{ fontWeight: "400", fontSize: "8px" }}>
                            Previous Due
                          </Text>{" "}
                          <Text>0.00</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "column", gap: "4px" }}>
                        <View
                          style={[
                            styles.headLabelP,
                            {
                              borderBottom: "0.5pt solid #acacac",
                              paddingVertical: "4px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={{ fontWeight: "400", fontSize: "8px" }}>
                            Paid
                          </Text>{" "}
                          <Text>0.00</Text>
                        </View>
                        <View
                          style={[
                            styles.headLabelP,
                            {
                              paddingBottom: "4px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={{ fontWeight: "600", fontSize: "8px" }}>
                            Current Due{" "}
                          </Text>{" "}
                          <Text>0.00</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* amount calculation end */}
                  {/* table section end  */}
                  {/* footer section start */}
                  <View style={{ marginTop: "62px" }}>
                    <View
                      style={{
                        borderRadius: "2px",
                        paddingHorizontal: "10px",
                        paddingVertical: "8px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "8px",
                          marginBottom: "6px",
                          fontWeight: "600",
                          color: "#0C0C0C",
                        }}
                      >
                        This warranty does not cover:
                      </Text>
                      <Text
                        style={{
                          fontSize: "8px",
                          height: "19px",
                          fontWeight: "400",
                          color: "#171717",
                        }}
                      >
                        - Damage caused by misuse, accidents, or unauthorized
                        repairs
                      </Text>
                      <Text
                        style={{
                          fontSize: "8px",
                          height: "19px",
                          fontWeight: "400",
                          color: "#171717",
                        }}
                      >
                        - Physical wear and tear
                      </Text>
                      <Text
                        style={{
                          fontSize: "8px",
                          height: "19px",
                          fontWeight: "400",
                          color: "#171717",
                        }}
                      >
                        - Issues arising from power surges or external factors
                      </Text>
                    </View>
                    <View style={{ marginTop: "10px" }}>
                      <Text style={{ fontSize: "8px" }}>
                        <Text style={{ fontWeight: "600", color: "#0C0C0C" }}>
                          Note:
                        </Text>{" "}
                        <Text style={{ color: "#171717" }}>CASH PAID</Text>
                      </Text>
                      <View
                        style={{
                          marginTop: "6px",
                          height: "100px",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ width: "80px" }}>
                            <Text
                              style={{
                                fontSize: "8px",
                                fontWeight: "600",
                                paddingBottom: "4px",
                                fontStyle: "italic",
                              }}
                            >
                              {" "}
                              sushan
                            </Text>
                            <Text
                              style={{
                                fontSize: "8px",
                                borderTop: "0.5pt solid #cccccc",
                                paddingTop: "8px",
                              }}
                            >
                              Receiver’s Sign
                            </Text>
                          </View>
                          <View style={{ width: "80px" }}>
                            <Text
                              style={{
                                fontSize: "8px",
                                fontWeight: "600",
                                paddingBottom: "4px",
                                fontStyle: "italic",
                              }}
                            >
                              {" "}
                              Alzaf pos
                            </Text>
                            <Text
                              style={{
                                fontSize: "8px",
                                borderTop: "0.5pt solid #cccccc",
                                paddingTop: "8px",
                              }}
                            >
                              Aurhorised Sign
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: "20px",
                        borderTop: "1pt solid #cccccc",
                        paddingTop: "8px",
                        flexDirection: "column",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "8px",
                          color: "#2E2E2E",
                          fontWeight: "400",
                        }}
                      >
                        Terms & Conditions: For any questions regarding this
                        invoice, please contact us.
                      </Text>
                      <Text
                        style={{
                          color: "#0C0C0C",
                          fontSize: "8px",
                          fontWeight: 600,
                        }}
                      >
                        Thank you for your business!
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {!isLastPage && (
                <View
                  style={{
                    marginTop: "20px",
                    borderTop: "1pt solid #cccccc",
                    paddingTop: "8px",
                    flexDirection: "column",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      color: "#2E2E2E",
                      fontWeight: "400",
                    }}
                  >
                    Terms & Conditions: For any questions regarding this
                    invoice, please contact us.
                  </Text>
                  <Text
                    style={{
                      color: "#0C0C0C",
                      fontSize: "8px",
                      fontWeight: 600,
                    }}
                  >
                    Thank you for your business!
                  </Text>
                </View>
              )}
            </View>
            {!isLastPage && (
              <Text style={styles.pageNumber}>
                Page {pageIndex + 1} of {chunkedData.length}
              </Text>
            )}
          </Page>
        );
      })}
    </Document>
  );
}

// "use client"
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
// import { HeadIcon } from "./icons"

// // Create styles like React Native StyleSheet
// const styles = StyleSheet.create({
//   page: {
//     padding: 0,
//     fontSize: 12,
//     fontFamily: "Helvetica",
//   },
//   headRow: {
//     flexDirection: "row",
//   },
//   backHeadOne: {
//     backgroundColor: "#1D2939",
//     height: "10px",
//     width: "50%",
//   },
//   backHeadTwo: {
//     backgroundColor: "#FF7239",
//     height: "10px",
//     width: "50%",
//   },
//   section: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     backgroundColor: "#F8F8F8",
//     marginBottom: 15,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#0C0C0C",
//   },
//   invoiceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   label: {
//     fontWeight: "bold",
//   },
//   headLabelP: {
//     color: "#0C0C0C",
//     fontSize: 9,
//     fontWeight: 400,
//   },
//   RightLogoText: {
//     color: "#0C0C0C",
//     fontSize: 12,
//     fontWeight: 700,
//   },
//   invoiceRowHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   logoRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 8,
//   },
//   addressHead: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 2,
//   },
//   leftContact: {
//     flexDirection: "row",
//     gap: "10px",
//   },
//   leftContentMain: {
//     flexDirection: "column",
//     gap: 2,
//   },
//   /*section Two*/
//   leftDiv: {
//     flexDirection: "column",
//     gap: "8px",
//     width: "213px",
//   },
//   leftDivText: {
//     color: "#0C0C0C",
//     fontWeight: 600,
//   },
//   rightDiv: {
//     flexDirection: "column",
//     gap: "8px",
//     width: "188px ",
//   },
//   branchAndTaxHead: {
//     color: "#0C0C0C",
//     fontSize: 10,
//     fontWeight: 700,
//   },
//   table: {
//     width: "100%",
//     border: "0.5pt solid #0C0C0C",
//     borderBottomWidth: "0px", // Optional: Set the bottom border width to 0px
//     marginTop: 24,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottom: "0.5pt solid #0C0C0C",
//     minHeight: 25,
//   },
//   tableHeader: {
//     // backgroundColor: "#f0f0f0",
//   },
//   tableCell: {
//     flexDirection: "row",
//     padding: 5,
//     borderRight: "0.5pt solid #0C0C0C",
//   },
//   tableCellLast: {
//     flex: 1,
//     padding: 5,
//   },
//   headerText: {
//     fontWeight: 600,
//     fontSize: 8,
//     color: "#0C0C0C",
//   },
//   cellText: {
//     fontSize: 10,
//     alignItems: "center",
//   },
//   // Define column widths
//   colSlNo: {
//     width: "32px",
//   },
//   colDescription: {
//     width: "261px",
//     flexDirection: "column",
//     gap: "4px",
//   },
//   colQuantity: {
//     width: "60px",
//     justifyContent: "center",
//   },
//   colUnitPrice: {
//     width: "66px",
//     justifyContent: "center",
//   },
//   colDiscount: {
//     width: "62px",
//     justifyContent: "center",
//   },
//   colTotal: {
//     width: "66px",
//     alignItems: "center",
//   },
// })

// // Your data type
// type InvoiceData = {
//   companyName: string
//   address: string
//   number: string
//   site: string
//   support: string
//   date: string
//   totalAmount: number
// }

// interface Data {
//   id: number
//   description: {
//     name: string
//     warranty: string
//     sn?: string // Made optional as not all sample data has it
//   }
//   quantity: string
//   unit_price: string
//   discount: string
//   total: string
// }

// export default function InvoiceDocumentTwo({ data }: { data: InvoiceData }) {
//   const firstPageLimit = 12
//   const otherPagesLimit = 13
//   const lastPageFixedItems = 5 // User's requirement for the last page

//   const chunkDataForPages = (
//     dataArray: Data[],
//     firstPageCount: number,
//     middlePageCount: number,
//     lastPageCount: number,
//   ) => {
//     const chunks: Data[][] = []
//     const total = dataArray.length
//     let currentIdx = 0

//     if (total === 0) {
//       return chunks
//     }

//     // First page
//     const firstPageData = dataArray.slice(currentIdx, currentIdx + firstPageCount)
//     chunks.push(firstPageData)
//     currentIdx += firstPageData.length

//     if (currentIdx >= total) {
//       return chunks // All data fits on the first page
//     }

//     // Calculate remaining data after the first page
//     let remainingData = dataArray.slice(currentIdx)
//     const remainingLength = remainingData.length

//     // If remaining data is less than or equal to the desired last page count,
//     // put all of it on the last page.
//     if (remainingLength <= lastPageCount) {
//       chunks.push(remainingData)
//       return chunks
//     }

//     // Now, we know there's enough data for at least one middle page and the last page.
//     // The items that will go into middle pages are: total remaining - lastPageCount
//     const itemsForMiddlePages = remainingLength - lastPageCount

//     // Calculate how many full middle pages we can have
//     const numFullMiddlePages = Math.floor(itemsForMiddlePages / middlePageCount)
//     const remainderForLastMiddlePage = itemsForMiddlePages % middlePageCount

//     // Add full middle pages
//     for (let i = 0; i < numFullMiddlePages; i++) {
//       chunks.push(remainingData.slice(0, middlePageCount))
//       remainingData = remainingData.slice(middlePageCount)
//     }

//     // Add the last middle page (if any remainder)
//     if (remainderForLastMiddlePage > 0) {
//       chunks.push(remainingData.slice(0, remainderForLastMiddlePage))
//       remainingData = remainingData.slice(remainderForLastMiddlePage)
//     }

//     // Add the final last page with the fixed number of items
//     chunks.push(remainingData.slice(0, lastPageCount))

//     return chunks
//   }

//   // Sample data (filtered and typo corrected)
//   const dataSe: Data[] = [
//     {
//       id: 1,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "QT45295754" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 2,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12345" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 3,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12346" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 4,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12347" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 5,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12348" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 6,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12349" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 7,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12350" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 8,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12351" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 9,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12352" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 10,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12353" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 11,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12354" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 12,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12355" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 13,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12356" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 14,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12357" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 15,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12358" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 16,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12359" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 17,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12360" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 18,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12361" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 19,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12362" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 20,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12363" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//     {
//       id: 21,
//       description: { name: "power supply chaina Hi-power 500w", warranty: "365 days", sn: "SN12364" },
//       quantity: "20",
//       unit_price: "50",
//       discount: "40",
//       total: "1054",
//     },
//   ]

//   const chunkedData = chunkDataForPages(dataSe, firstPageLimit, otherPagesLimit, lastPageFixedItems)

//   return (
//     <Document>
//       {chunkedData.map((pageData, pageIndex) => {
//         const isFirstPage = pageIndex === 0
//         const isLastPage = pageIndex === chunkedData.length - 1

//         // Calculate the starting serial number for the current page
//         const serialOffset = chunkedData.slice(0, pageIndex).reduce((sum, chunk) => sum + chunk.length, 0)

//         return (
//           <Page key={pageIndex} size="A4" style={styles.page}>
//             <View style={{ paddingHorizontal: "20px", paddingVertical: "22px" }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   gap: "5px",
//                 }}
//               >
//                 <View>
//                   <HeadIcon />
//                 </View>
//                 <View>
//                   <Text style={styles.header}>{data.companyName} </Text>
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 paddingHorizontal: 20,
//                 paddingTop: 16,
//                 paddingBottom: 36,
//               }}
//             >
//               {isFirstPage && (
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <View style={styles.leftDiv}>
//                     <Text style={[styles.branchAndTaxHead, {}]}>Dhaka Branch</Text>
//                     <View style={{ flexDirection: "column", gap: "4px" }}>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Address:</Text> Motijheel, Dhaka 1000
//                       </Text>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Email:</Text> Support@alzafpos.com
//                       </Text>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Phone:</Text> +8800138715416
//                       </Text>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Web:</Text> www.alzafpos.com
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={styles.rightDiv}>
//                     <Text style={styles.branchAndTaxHead}>Text Invoice</Text>
//                     <View style={{ flexDirection: "column", gap: "4px" }}>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Invoice No:</Text> Motijheel, Dhaka 1000
//                       </Text>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Chalan No:</Text> Support@alzafpos.com
//                       </Text>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Date:</Text> +8800138715416
//                       </Text>
//                       <Text style={styles.headLabelP}>
//                         <Text style={styles.leftDivText}>Zone:</Text> www.alzafpos.com
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               )}
//               {/* table section  start*/}
//               <View style={styles.table}>
//                 {/* Table Header */}
//                 <View style={[styles.tableRow, styles.tableHeader]}>
//                   <View style={[styles.tableCell, styles.colSlNo]}>
//                     <Text style={styles.headerText}>Sl No</Text>
//                   </View>
//                   <View style={[styles.tableCell, styles.colDescription]}>
//                     <Text style={styles.headerText}>Product Description</Text>
//                   </View>
//                   <View style={[styles.tableCell, styles.colQuantity]}>
//                     <Text style={styles.headerText}>Quantity</Text>
//                   </View>
//                   <View style={[styles.tableCell, styles.colUnitPrice]}>
//                     <Text style={styles.headerText}>Unit Price</Text>
//                   </View>
//                   <View style={[styles.tableCell, styles.colDiscount]}>
//                     <Text style={styles.headerText}>Discount</Text>
//                   </View>
//                   <View style={[styles.tableCellLast, styles.colTotal]}>
//                     <Text style={styles.headerText}>Total</Text>
//                   </View>
//                 </View>
//                 {/* Table Body */}
//                 {pageData.map((row, index) => {
//                   const serialNo = serialOffset + index + 1
//                   return (
//                     <View key={row.id + "-" + index} style={[styles.tableRow]}>
//                       <View style={[styles.tableCell, styles.colSlNo]}>
//                         <Text style={styles.cellText}>{serialNo}</Text>
//                       </View>
//                       <View style={[styles.tableCell, styles.colDescription]}>
//                         {Object.entries(row.description ?? {}).map(([key, value]) => (
//                           <Text key={key} style={styles.cellText}>
//                             <Text
//                               style={{
//                                 fontSize: "8px",
//                                 fontWeight: "600",
//                                 color: "#0C0C0C",
//                               }}
//                             >
//                               {key}:
//                             </Text>
//                             <Text style={{ fontSize: "8px" }}> {String(value)}</Text>
//                           </Text>
//                         ))}
//                       </View>
//                       <View style={[styles.tableCell, styles.colQuantity]}>
//                         <Text style={[styles.cellText, { fontSize: "8px" }]}>{row.quantity}</Text>
//                       </View>
//                       <View style={[styles.tableCell, styles.colUnitPrice]}>
//                         <Text style={[styles.cellText, { fontSize: "8px" }]}>{row.unit_price}</Text>
//                       </View>
//                       <View style={[styles.tableCell, styles.colDiscount]}>
//                         <Text style={[styles.cellText, { fontSize: "8px" }]}>{row.discount}</Text>
//                       </View>
//                       <View style={[styles.tableCellLast, styles.colTotal]}>
//                         <Text style={[styles.cellText, { fontSize: "8px" }]}>{row.total}</Text>
//                       </View>
//                     </View>
//                   )
//                 })}
//               </View>
//               {isLastPage && (
//                 <View>
//                   {/* amount calculation start */}
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginTop: "16px",
//                     }}
//                   >
//                     <View>
//                       <Text style={{ fontSize: "8px", fontWeight: "400" }}>
//                         <Text style={{ color: "#0C0C0C", fontWeight: "600" }}>IN WORD:</Text> Twenty - Eight Thousand
//                         Seven Hundred Taka Only
//                       </Text>
//                     </View>
//                     <View>
//                       <View
//                         style={{
//                           flexDirection: "column",
//                           gap: "4px",
//                           width: "200px",
//                         }}
//                       >
//                         <View
//                           style={[
//                             styles.headLabelP,
//                             {
//                               borderBottom: "0.5pt solid #0C0C0C",
//                               paddingVertical: "4px",
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                             },
//                           ]}
//                         >
//                           <Text style={{ fontWeight: "400", fontSize: "8px" }}>Total Amount</Text> <Text>0.00</Text>
//                         </View>
//                         <View
//                           style={[
//                             styles.headLabelP,
//                             {
//                               borderBottom: "0.5pt solid #0C0C0C",
//                               paddingVertical: "4px",
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                             },
//                           ]}
//                         >
//                           <Text style={{ fontWeight: "600", fontSize: "8px" }}>Grand Total</Text>{" "}
//                           <Text style={{ fontWeight: "600" }}>0.00</Text>
//                         </View>
//                         <View
//                           style={[
//                             styles.headLabelP,
//                             {
//                               borderBottom: "0.5pt solid #0C0C0C",
//                               paddingVertical: "4px",
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                             },
//                           ]}
//                         >
//                           <Text style={{ fontWeight: "400", fontSize: "8px" }}>Previous Due</Text> <Text>0.00</Text>
//                         </View>
//                       </View>
//                       <View style={{ flexDirection: "column", gap: "4px" }}>
//                         <View
//                           style={[
//                             styles.headLabelP,
//                             {
//                               borderBottom: "0.5pt solid #0C0C0C",
//                               paddingVertical: "4px",
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                             },
//                           ]}
//                         >
//                           <Text style={{ fontWeight: "400", fontSize: "8px" }}>Paid</Text> <Text>0.00</Text>
//                         </View>
//                         <View
//                           style={[
//                             styles.headLabelP,
//                             {
//                               paddingBottom: "4px",
//                               flexDirection: "row",
//                               justifyContent: "space-between",
//                             },
//                           ]}
//                         >
//                           <Text style={{ fontWeight: "600", fontSize: "8px" }}>Current Due </Text>{" "}
//                           <Text style={{ fontWeight: "600" }}>0.00</Text>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   {/* amount calculation end */}
//                   {/* table section end  */}
//                   {/* footer section start */}
//                   <View style={{ marginTop: "62px" }}>
//                     <View
//                       style={{
//                         // backgroundColor: "#F0F1F1",
//                         borderRadius: "2px",
//                         paddingHorizontal: "10px",
//                         paddingVertical: "8px",
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: "8px",
//                           marginBottom: "6px",
//                           fontWeight: "600",
//                           color: "#0C0C0C",
//                         }}
//                       >
//                         This warranty does not cover:
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: "8px",
//                           height: "19px",
//                           fontWeight: "400",
//                           color: "#171717",
//                         }}
//                       >
//                         - Damage caused by misuse, accidents, or unauthorized repairs
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: "8px",
//                           height: "19px",
//                           fontWeight: "400",
//                           color: "#171717",
//                         }}
//                       >
//                         - Physical wear and tear
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: "8px",
//                           height: "19px",
//                           fontWeight: "400",
//                           color: "#171717",
//                         }}
//                       >
//                         - Issues arising from power surges or external factors
//                       </Text>
//                     </View>
//                     <View style={{ marginTop: "10px" }}>
//                       <Text style={{ fontSize: "8px" }}>
//                         <Text style={{ fontWeight: "600", color: "#0C0C0C" }}>Note:</Text>{" "}
//                         <Text style={{ color: "#171717" }}>CASH PAID</Text>
//                       </Text>
//                       <View
//                         style={{
//                           marginTop: "6px",
//                           height: "100px",
//                           flexDirection: "column",
//                           justifyContent: "flex-end",
//                         }}
//                       >
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <View style={{ width: "80px" }}>
//                             <Text
//                               style={{
//                                 fontSize: "8px",
//                                 fontWeight: "600",
//                                 paddingBottom: "4px",
//                                 fontStyle: "italic",
//                               }}
//                             >
//                               {" "}
//                               sushan
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: "8px",
//                                 borderTop: "0.5pt solid #0C0C0C",
//                                 paddingTop: "8px",
//                               }}
//                             >
//                               Receiver’s Sign
//                             </Text>
//                           </View>
//                           <View style={{ width: "80px" }}>
//                             <Text
//                               style={{
//                                 fontSize: "8px",
//                                 fontWeight: "600",
//                                 paddingBottom: "4px",
//                                 fontStyle: "italic",
//                               }}
//                             >
//                               {" "}
//                               Alzaf pos
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: "8px",
//                                 borderTop: "0.5pt solid #0C0C0C",
//                                 paddingTop: "8px",
//                               }}
//                             >
//                               Aurhorised Sign
//                             </Text>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <View
//                       style={{
//                         marginTop: "20px",
//                         borderTop: "0.5pt solid #0C0C0C",
//                         paddingTop: "8px",
//                         flexDirection: "column",
//                         gap: "4px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: "8px",
//                           color: "#2E2E2E",
//                           fontWeight: "400",
//                         }}
//                       >
//                         Terms & Conditions: For any questions regarding this invoice, please contact us.
//                       </Text>
//                       <Text
//                         style={{
//                           color: "#0C0C0C",
//                           fontSize: "8px",
//                           fontWeight: 600,
//                         }}
//                       >
//                         Thank you for your business!
//                       </Text>
//                     </View>
//                   </View>
//                   {/* footer section end */}
//                 </View>
//               )}
//             </View>
//           </Page>
//         )
//       })}
//     </Document>
//   )
// }
